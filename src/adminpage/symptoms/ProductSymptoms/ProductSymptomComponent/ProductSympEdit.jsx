import React, { useEffect, useState } from "react";
import { Modal, Form, Select, message } from "antd";

const { Option } = Select;

const ProductSympEdit = ({ isOpen, onClose, onUpdateProductSymptom, productSymptom, products, symptoms }) => {
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

  const handleUpdate = () => {
    form.validateFields()
      .then(values => {
        setLoading(true);
        
        // Find selected product and symptom to get their names
        const selectedProduct = products.find(p => p.id === values.productId);
        const selectedSymptom = symptoms.find(s => s.id === values.partSymptomId);
        
        if (!selectedProduct || !selectedSymptom) {
          message.error("Không tìm thấy thông tin sản phẩm hoặc triệu chứng");
          setLoading(false);
          return;
        }
        
        // Create updated product-symptom link
        const updatedProductSymptom = {
          ...productSymptom,
          partSymptomId: values.partSymptomId,
          productId: values.productId,
          partSymptomName: selectedSymptom.name,
          productName: selectedProduct.name,
          updatedDate: new Date().toISOString()
        };

        // Giả lập API call
        setTimeout(() => {
          onUpdateProductSymptom(updatedProductSymptom);
          onClose();
          setLoading(false);
        }, 500);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa liên kết sản phẩm - triệu chứng"
      open={isOpen}
      onCancel={onClose}
      okText="Cập nhật"
      onOk={handleUpdate}
      okButtonProps={{ loading: loading }}
      maskClosable={false}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="productId"
          label="Sản phẩm"
          rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
        >
          <Select
            placeholder="Chọn sản phẩm"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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
            placeholder="Chọn triệu chứng"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {symptoms.map(symptom => (
              <Option key={symptom.id} value={symptom.id}>
                {symptom.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductSympEdit;