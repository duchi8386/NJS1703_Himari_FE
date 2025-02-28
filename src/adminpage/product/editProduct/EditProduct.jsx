import React, { useEffect } from 'react';
import { Modal, Form, Input, Upload, Select, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const EditProduct = ({ isOpen, onClose, productData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        productName: productData.productName,
        price: productData.price,
        description: productData.description,
        status: productData.status,
      });
    }
  }, [productData, form]);

  const handleSubmit = (values) => {
    console.log('Updated values:', values);
    onClose();
  };

  return (
    <Modal
      title={<div className="text-xl font-semibold">Edit Product</div>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className="relative"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
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
                className="h-10 rounded"
                placeholder="Enter price"
              />
            </Form.Item>

            <Form.Item
              name="status"
              label={<span className="text-sm">Status <span className="text-red-500">*</span></span>}
              rules={[{ required: true, message: 'Please select status!' }]}
            >
              <Select
                placeholder="Select status"
                className="w-full h-10"
              >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Right Column */}
          <div>
            <Form.Item
              name="description"
              label={<span className="text-sm">Description <span className="text-red-500">*</span></span>}
              rules={[{ required: true, message: 'Please input description!' }]}
            >
              <Input.TextArea 
                placeholder="Enter product description" 
                rows={8}
                className="rounded resize-none"
                maxLength={500}
                showCount
              />
            </Form.Item>
          </div>
        </div>

        {/* Product Image Section */}
        <div className="mt-6">
          <h2 className="text-sm font-medium mb-2">Product Image</h2>
          <p className="text-sm text-gray-500 mb-2">Current Image:</p>
          {productData?.image && (
            <div className="mb-4">
              <img 
                src={productData.image} 
                alt="Current product" 
                className="w-40 h-40 object-cover rounded-md"
              />
            </div>
          )}
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            className="w-full"
          >
            <Button 
              icon={<UploadOutlined />} 
              className="h-9 rounded"
            >
              Upload New Image
            </Button>
          </Upload>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <Button 
            onClick={onClose} 
            className="px-6 h-9 rounded"
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit"
            className="px-6 h-9 rounded bg-blue-600 hover:bg-blue-700"
          >
            Update Product
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProduct;