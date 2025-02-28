import React from 'react';
import { Modal, Form, Input, Upload, Select, Button, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddProduct = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title={<div className="text-xl font-semibold">Add New Product</div>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      className="relative"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item
          name="productName"
          label={<span className="text-sm">Product Name <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Please input product name!' }]}
        >
          <Input 
            placeholder="Enter product name" 
            className="h-10 rounded" 
          />
        </Form.Item>

        <Form.Item
          name="price"
          label={<span className="text-sm">Price <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Please input price!' }]}
        >
          <Input 
            prefix="$" 
            className="h-10 rounded"
            placeholder="0.00"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span className="text-sm">Description <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <Input.TextArea 
            placeholder="Enter product description" 
            rows={4}
            className="rounded resize-none"
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="category"
          label={<span className="text-sm">Category <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select
            placeholder="Select a category"
            className="w-full h-10"
          >
            <Select.Option value="category1">Category 1</Select.Option>
            <Select.Option value="category2">Category 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="brand"
          label={<span className="text-sm">Brand <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Please select a brand!' }]}
        >
          <Select
            placeholder="Select a brand"
            className="w-full h-10"
          >
            <Select.Option value="brand1">Brand 1</Select.Option>
            <Select.Option value="brand2">Brand 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label={<span className="text-sm">Thumbnail <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Please upload a thumbnail!' }]}
        >
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            className="w-full"
          >
            <Button icon={<UploadOutlined />} className="w-32 h-10 rounded">
              Select Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item className="flex justify-center mb-0 pt-4">
          <Button 
            type="primary" 
            htmlType="submit"
            className="w-full h-10 rounded bg-blue-600 hover:bg-blue-700"
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
