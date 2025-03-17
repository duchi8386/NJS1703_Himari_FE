import React, { useEffect, useState } from "react";
import { Modal, Form, Select, message, Spin } from "antd";

const { Option } = Select;

const ProductSympEdit = ({
  isOpen,
  onClose,
  onUpdateProductSymptom,
  productSymptom,
  products,
  symptoms,
  productsLoading,
  symptomsLoading
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && productSymptom) {
      form.setFieldsValue({
        productId: productSymptom.productId,
        partSymptomId: productSymptom.partSymptomId,
      });
    }
  }, [isOpen, productSymptom, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (!productSymptom) {
        message.error("Không có dữ liệu để cập nhật");
        setLoading(false);
        return;
      }

      // Create updated product-symptom link
      const updatedProductSymptom = {
        id: productSymptom.id,
        partSymptomId: values.partSymptomId,
        productId: values.productId,
      };

      await onUpdateProductSymptom(updatedProductSymptom);

    } catch (info) {
      console.log('Validate Failed:', info);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa liên kết sản phẩm - triệu chứng"
      open={isOpen}
      onCancel={onClose}
      okText="Cập nhật"
      onOk={handleUpdate}
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
            name="partSymptomId"
            label="Triệu chứng"
            rules={[{ required: true, message: "Vui lòng chọn triệu chứng" }]}
          >
            <Select
              placeholder={symptomsLoading ? "Đang tải..." : "Chọn triệu chứng"}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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

export default ProductSympEdit;