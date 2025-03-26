import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Switch, message } from 'antd';
import ProductAPI from '../../../service/api/productAPI';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';

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
  const [uploading, setUploading] = useState(false);

  // Handle parent category change
  const handleParentCategoryChange = (value) => {
    setSelectedParentCategory(value);
    form.setFieldValue('childCategory', undefined);
    if (value) {
      onFetchChildCategories(value);
    }
  };

  const handleImageChange = (file) => {
    form.setFieldValue('thumbnail', file);
  };

  const handleSubmit = async (values) => {
    try {
      setUploading(true);

      // Upload image to Firebase first
      let imageUrl = '';
      if (values.thumbnail) {
        const uploadResponse = await ProductAPI.uploadToFirebase(values.thumbnail);
        if (uploadResponse?.data) {
          imageUrl = uploadResponse.data.data;
        } else {
          throw new Error('Upload failed');
        }
      }

      // Prepare product data
      const productData = {
        productName: values.productName,
        description: values.description,
        price: parseFloat(values.price),
        imageUrl: imageUrl,
        categoryId: values.childCategory,
        brandId: values.brand,
        gender: values.gender || true,
        quantity: values.quantity || 0,
      };

      // Add product
      const response = await ProductAPI.AddProducts(productData);

      if (response.status === 200) {
        message.success('Thêm sản phẩm thành công!');
        onProductAdded();
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Có lỗi xảy ra khi thêm sản phẩm!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      title={<div className="text-xl font-semibold">Thêm sản phẩm mới</div>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          gender: true,
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Form.Item
              name="productName"
              label={<span className="text-sm">Tên sản phẩm <span className="text-red-500">*</span></span>}
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
              <Input
                placeholder="Nhập tên sản phẩm"
                className="h-10 rounded"
              />
            </Form.Item>

            <Form.Item
              name="price"
              label={<span className="text-sm">Giá <span className="text-red-500">*</span></span>}
              rules={[
                { required: true, message: 'Vui lòng nhập giá!' },
                {
                  pattern: /^\d+(\.\d+)?$/,
                  message: 'Giá phải là số!'
                }
              ]}
            >
              <Input
                className="h-10 rounded"
                placeholder="Nhập giá sản phẩm"
                type="number"
                min="0"
                step="0.01"
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
              name="quantity"
              label={<span className="text-sm">Số lượng</span>}
              rules={[
                {
                  pattern: /^\d+$/,
                  message: 'Số lượng phải là số nguyên!'
                }
              ]}
            >
              <Input
                className="h-10 rounded"
                type="number"
                min="0"
                step="1"
                placeholder="Nhập số lượng"
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label={<span className="text-sm">Giới tính</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch
                checkedChildren="Nam"
                unCheckedChildren="Nữ"
              />
            </Form.Item>
          </div>

          <div>
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

            <div className="mt-4">
              <Form.Item
                name="thumbnail"
                label={<span className="text-sm">Hình ảnh <span className="text-red-500">*</span></span>}
                rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh sản phẩm!' }]}
              >
                <ImageUpload onChange={handleImageChange} />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button
            onClick={onClose}
            className="px-6 h-9 rounded"
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="px-6 h-9 rounded bg-blue-600 hover:bg-blue-700"
            loading={uploading}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddProduct;
