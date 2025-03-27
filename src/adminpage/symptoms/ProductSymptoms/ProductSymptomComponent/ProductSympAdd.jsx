import React, { useState } from "react";
import { Modal, Form, Select, message, Typography, Spin } from "antd";

const { Option } = Select;
const { Text } = Typography;

const ProductSympAdd = ({
  isOpen,
  onClose,
  onAddProductSymptom,
  products,
  symptoms,
  productsLoading,
  symptomsLoading
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Now we send a single request with all symptoms at once
      const productId = values.productId;
      const listPartSymptomId = values.partSymptomIds;

      try {
        await onAddProductSymptom(productId, listPartSymptomId);
        // message.success("Thêm liên kết sản phẩm-triệu chứng thành công");
      } catch (error) {
        console.error("Failed to add product-symptom:", error);
        message.error("Lỗi khi thêm liên kết: " + (error.message || "Không xác định"));
      }

      handleCancel();

    } catch (info) {
      console.log('Validate Failed:', info);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Thêm liên kết sản phẩm - triệu chứng mới"
      open={isOpen}
      onCancel={handleCancel}
      okText="Thêm mới"
      onOk={handleCreate}
      okButtonProps={{ loading: loading || productsLoading || symptomsLoading }}
      cancelButtonProps={{ disabled: loading || productsLoading || symptomsLoading }}
      maskClosable={false}
      width={600}
    >
      <Spin spinning={productsLoading || symptomsLoading}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="productId"
            label="Sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
          >
            <Select
              placeholder={productsLoading ? "Đang tải..." : "Chọn sản phẩm"}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              disabled={productsLoading}
            >
              {products.map(product => (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="partSymptomIds"
            label="Triệu chứng"
            rules={[{ required: true, message: "Vui lòng chọn ít nhất một triệu chứng" }]}
            extra={<Text type="secondary">Bạn có thể chọn nhiều triệu chứng cùng lúc</Text>}
          >
            <Select
              placeholder={symptomsLoading ? "Đang tải..." : "Chọn triệu chứng"}
              showSearch
              mode="multiple"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              maxTagCount={5}
              maxTagTextLength={15}
              disabled={symptomsLoading}
            >
              {symptoms.map(symptom => (
                <Option key={symptom.id} value={symptom.id}>
                  {symptom.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ProductSympAdd;