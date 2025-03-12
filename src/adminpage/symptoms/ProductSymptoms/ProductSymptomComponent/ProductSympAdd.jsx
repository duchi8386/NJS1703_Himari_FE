import React, { useState } from "react";
import { Modal, Form, Select, message, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

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
        
        // Find selected product
        const selectedProduct = products.find(p => p.id === values.productId);
        
        if (!selectedProduct) {
          message.error("Không tìm thấy thông tin sản phẩm");
          setLoading(false);
          return;
        }
        
        // Create new product-symptom links for each selected symptom
        const newProductSymptoms = values.partSymptomIds.map(symptomId => {
          const selectedSymptom = symptoms.find(s => s.id === symptomId);
          
          return {
            id: Date.now() + Math.floor(Math.random() * 1000), // Unique ID
            partSymptomId: symptomId,
            productId: values.productId,
            partSymptomName: selectedSymptom ? selectedSymptom.name : 'Unknown',
            productName: selectedProduct.name,
            createdDate: new Date().toISOString(),
            updatedDate: null,
            isDeleted: false
          };
        });

        // Giả lập API call
        setTimeout(() => {
          // Thêm từng liên kết triệu chứng-sản phẩm
          newProductSymptoms.forEach(item => {
            onAddProductSymptom(item);
          });
          
          message.success(`Đã thêm ${newProductSymptoms.length} liên kết sản phẩm-triệu chứng`);
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
          name="partSymptomIds"
          label="Triệu chứng"
          rules={[{ required: true, message: "Vui lòng chọn ít nhất một triệu chứng" }]}
          extra={<Text type="secondary">Bạn có thể chọn nhiều triệu chứng cùng lúc</Text>}
        >
          <Select
            placeholder="Chọn triệu chứng"
            showSearch
            mode="multiple"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            maxTagCount={5}
            maxTagTextLength={15}
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