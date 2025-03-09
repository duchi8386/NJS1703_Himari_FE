import React, { useState } from "react";
import { Modal, Form, Select, message } from "antd";

const { Option } = Select;

const ProductSympAdd = ({ isOpen, onClose, onAddProductSymptom, products, symptoms }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // Group symptoms by their names for better display
  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.name]) {
      acc[symptom.name] = [];
    }
    acc[symptom.name].push(symptom);
    return acc;
  }, {});

  const handleCreate = () => {
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
        
        // Create new product-symptom link
        const newProductSymptom = {
          id: Date.now(), // Sử dụng timestamp làm id tạm thời
          partSymptomId: values.partSymptomId,
          productId: values.productId,
          partSymptomName: selectedSymptom.name,
          productName: selectedProduct.name,
          createdDate: new Date().toISOString(),
          updatedDate: null,
          isDeleted: false
        };

        // Giả lập API call
        setTimeout(() => {
          onAddProductSymptom(newProductSymptom);
          handleCancel();
          setLoading(false);
        }, 500);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
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

export default ProductSympAdd;