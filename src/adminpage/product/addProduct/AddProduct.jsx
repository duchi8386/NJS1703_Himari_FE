import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Select, Button, Switch, message } from 'antd';
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Handle parent category change
  const handleParentCategoryChange = (value) => {
    setSelectedParentCategory(value);
    form.setFieldValue('childCategory', undefined);
    if (value) {
      onFetchChildCategories(value);
    }
  };

  const handleImagePreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
    return false; // Prevent default upload behavior
  };

  const handleSubmit = async (values) => {
    try {
      setUploading(true);

      // Upload image to Firebase first
      let imageUrl = '';
      if (selectedFile) {
        const uploadResponse = await ProductAPI.uploadToFirebase(selectedFile);
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
      };

      // Add product
      const response = await ProductAPI.AddProducts(productData);

      if (response.status === 200) {
        message.success('Thêm sản phẩm thành công!');
        onProductAdded();
        form.resetFields();
        setSelectedFile(null);
        setPreviewUrl('');
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
              rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
            >
              <Input
                className="h-10 rounded"
                placeholder="Nhập giá sản phẩm"
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
                <div>
                  {previewUrl && (
                    <div className="mb-4">
                      <img
                        src={previewUrl}
                        alt="Product preview"
                        className="w-40 h-40 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <Upload
                    maxCount={1}
                    beforeUpload={handleImagePreview}
                    showUploadList={false}
                    className="w-full"
                  >
                    <Button icon={<UploadOutlined />} className="w-32 h-10 rounded">
                      Chọn ảnh
                    </Button>
                  </Upload>
                </div>
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
