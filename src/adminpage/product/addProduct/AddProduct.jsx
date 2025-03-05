import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Select, Button, InputNumber, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProductAPI from '../../../service/api/productAPI';
import CategoryAPI from '../../../service/api/CategoryAPI';
import BrandAPI from '../../../service/api/brandAPI';

const AddProduct = ({
  isOpen,
  onClose,
  parentCategories,
  childCategories,
  brands,
  onFetchChildCategories,
  onProductAdded,
  loadingCategories,
  loadingBrands
}) => {
  const [form] = Form.useForm();
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);

  // Handle parent category change
  const handleParentCategoryChange = (value) => {
    setSelectedParentCategory(value);
    form.setFieldValue('childCategory', undefined);
    if (value) {
      onFetchChildCategories(value);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      // ... thêm các trường vào formData ...

      const response = await ProductAPI.AddProducts(formData);
      if (response.status === 200) {
        message.success('Thêm sản phẩm thành công!');
        onProductAdded(); // Gọi callback để refresh danh sách sản phẩm
        form.resetFields();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Có lỗi xảy ra khi thêm sản phẩm!');
    }
  };

  return (
    <Modal
      title={<div className="text-xl font-semibold">Thêm sản phẩm mới</div>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          name="brand"
          label={<span className="text-sm">Thương hiệu <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
        >
          <Select
            placeholder="Chọn thương hiệu"
            className="w-full h-10"
            loading={loadingBrands}
            allowClear
          >
            {brands.map(brand => (
              <Select.Option key={brand.id} value={brand.id}>
                {brand.brandName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="parentCategory"
          label={<span className="text-sm">Danh mục cha <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Vui lòng chọn danh mục cha!' }]}
        >
          <Select
            placeholder="Chọn danh mục cha"
            className="w-full h-10"
            onChange={handleParentCategoryChange}
            loading={loadingCategories}
            allowClear
          >
            {parentCategories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="childCategory"
          label={<span className="text-sm">Danh mục con <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Vui lòng chọn danh mục con!' }]}
        >
          <Select
            placeholder={selectedParentCategory ? "Chọn danh mục con" : "Vui lòng chọn danh mục cha trước"}
            className="w-full h-10"
            disabled={!selectedParentCategory}
            loading={loadingCategories}
            allowClear
          >
            {childCategories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label={<span className="text-sm">Mô tả <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
        >
          <Input.TextArea
            placeholder="Nhập mô tả sản phẩm"
            rows={4}
            className="rounded resize-none"
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label={<span className="text-sm">Hình ảnh <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh sản phẩm!' }]}
        >
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            className="w-full"
          >
            <Button icon={<UploadOutlined />} className="w-32 h-10 rounded">
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item className="flex justify-center mb-0 pt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 rounded bg-blue-600 hover:bg-blue-700"
          >
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
