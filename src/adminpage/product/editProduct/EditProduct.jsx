import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, Select, Button, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import ProductAPI from '../../../service/api/productAPI';

const EditProduct = ({
  isOpen,
  onClose,
  productData,
  parentCategories = [],
  childCategories = [],
  brands = [],
  onFetchChildCategories,
  onEditProduct,
  loadingCategories,
  loadingBrands
}) => {
  const [form] = Form.useForm();
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (productData) {
      if (productData.parentCategoryId) {
        onFetchChildCategories(productData.parentCategoryId);
        setSelectedParentCategory(productData.parentCategoryId);
      }

      setImageUrl(productData.imageUrl);
      setPreviewUrl(productData.imageUrl);
      form.setFieldsValue({
        productName: productData.productName,
        price: productData.price,
        description: productData.description,
        childCategory: productData.categoryId,
        brand: productData.brandId,
        gender: productData.gender || true,
        quantity: productData.quantity || 0,
      });
    }
  }, [productData, form, onFetchChildCategories]);

  const handleParentCategoryChange = (value) => {
    console.log("Selected Parent Category:", value);
    setSelectedParentCategory(value);
    form.setFieldValue('childCategory', undefined);
    if (value) {
      onFetchChildCategories(value);
    } else {
      setSelectedParentCategory(null);
    }
  };

  const handleImagePreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
    return false;
  };

  const handleSubmit = async (values) => {
    try {
      setUploading(true);
      let finalImageUrl = imageUrl;

      if (selectedFile) {
        const response = await ProductAPI.uploadToFirebase(selectedFile);
        if (response?.data) {
          finalImageUrl = response.data.data;
        } else {
          throw new Error('Upload failed');
        }
      }

      const updatedValues = {
        ...values,
        imageUrl: finalImageUrl,
      };

      await onEditProduct(updatedValues, productData.id);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error during update:', error);
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      title={<div className="text-xl font-semibold">Chỉnh sửa sản phẩm</div>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
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

            <div className="mb-4">
              <label className="text-sm block mb-2">
                Danh mục cha <span className="text-red-500">*</span>
              </label>
              <Select
                placeholder="Chọn danh mục cha"
                onChange={handleParentCategoryChange}
                loading={loadingCategories}
                className="w-full h-10"
                value={selectedParentCategory}
              >
                {Array.isArray(parentCategories) && parentCategories.map(category => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.categoryName}
                  </Select.Option>
                ))}
              </Select>
            </div>

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
              >
                {Array.isArray(childCategories) && childCategories.map(category => (
                  <Select.Option
                    key={category.id}
                    value={category.id}
                  >
                    {category.categoryName}
                  </Select.Option>
                ))}
              </Select>
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
              >
                {Array.isArray(brands) && brands.map(brand => (
                  <Select.Option key={brand.id} value={brand.id}>
                    {brand.brandName}
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

            <Form.Item
              name="quantity"
              label={<span className="text-sm">Số lượng</span>}
            >
              <Input
                // disabled
                className="h-10 rounded"
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="description"
              label={<span className="text-sm">Mô tả <span className="text-red-500">*</span></span>}
              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
              <Input.TextArea
                placeholder="Nhập mô tả sản phẩm"
                rows={8}
                className="rounded resize-none"
                maxLength={500}
                showCount
              />
            </Form.Item>

            <div className="mt-4">
              <p className="text-sm mb-2">Hình ảnh hiện tại:</p>
              {previewUrl && (
                <div className="mb-4">
                  <img
                    src={previewUrl}
                    alt="Current product"
                    className="w-40 h-40 object-cover rounded-md"
                  />
                </div>
              )}
              <Form.Item
                name="thumbnail"
                label={<span className="text-sm">Cập nhật hình ảnh</span>}
              >
                <Upload
                  maxCount={1}
                  beforeUpload={handleImagePreview}
                  showUploadList={false}
                  className="w-full"
                >
                  <Button 
                    icon={<UploadOutlined />} 
                    className="w-32 h-10 rounded"
                  >
                    Chọn ảnh mới
                  </Button>
                </Upload>
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
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProduct;