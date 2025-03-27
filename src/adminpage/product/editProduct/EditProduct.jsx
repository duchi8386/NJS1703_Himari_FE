import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, Switch } from 'antd';
import { message } from 'antd';
import ProductAPI from '../../../service/api/productAPI';
import CategoryAPI from '../../../service/api/CategoryAPI';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';

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
  const [loadingCategoryData, setLoadingCategoryData] = useState(false);

  // Reset form and state when productData changes or when modal is opened/closed
  useEffect(() => {
    if (productData) {
      setImageUrl(productData.imageUrl);
      form.setFieldsValue({
        productName: productData.productName,
        price: productData.price,
        description: productData.description,
        brand: productData.brandId,
        gender: productData.gender || true,
        quantity: productData.quantity || 0,
        // Important: Remove this field from form so ImageUpload gets initialized properly
        thumbnail: null,
      });

      // Fetch category information using categoryId
      fetchCategoryInfo(productData.categoryId);
    }
  }, [productData, form, isOpen]); // Add isOpen to dependencies to reset when modal is opened/closed

  const fetchCategoryInfo = async (categoryId) => {
    if (!categoryId) return;

    try {
      setLoadingCategoryData(true);
      const categoryData = await CategoryAPI.getCategoryById(categoryId);
      // console.log("cate info:", categoryData);
      if (categoryData && categoryData.data.parentCategoryId) {
        // Set parent category
        setSelectedParentCategory(categoryData.data.parentCategoryId);
        form.setFieldValue('childCategory', categoryId);

        // Fetch child categories of this parent
        onFetchChildCategories(categoryData.data.parentCategoryId);
      } else {
        // If it's a parent category itself
        setSelectedParentCategory(categoryId);
        form.setFieldValue('childCategory', null);
      }
    } catch (error) {
      console.error('Error fetching category details:', error);
      message.error('Không thể tải thông tin danh mục');
    } finally {
      setLoadingCategoryData(false);
    }
  };

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

  const handleImageChange = (file) => {
    form.setFieldValue('thumbnail', file);
  };

  const handleSubmit = async (values) => {
    try {
      setUploading(true);
      let finalImageUrl = imageUrl;

      if (values.thumbnail) {
        const response = await ProductAPI.uploadToFirebase(values.thumbnail);
        if (response?.data) {
          finalImageUrl = response.data.data;
          // Update the imageUrl state with the new URL
          setImageUrl(finalImageUrl);
        } else {
          throw new Error('Upload failed');
        }
      }

      const updatedValues = {
        ...values,
        imageUrl: finalImageUrl,
      };

      await onEditProduct(updatedValues, productData.id);

      // Clear the thumbnail field after successful update
      form.setFieldValue('thumbnail', null);
    } catch (error) {
      console.error('Error during update:', error);
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm!');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    // Reset form and clear thumbnail field when closing the modal
    form.setFieldValue('thumbnail', null);
    onClose();
  };

  return (
    <Modal
      title={<div className="text-xl font-semibold">Chỉnh sửa sản phẩm</div>}
      open={isOpen}
      onCancel={handleClose}
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
              hidden
            >
              <Switch
                checkedChildren="Nam"
                unCheckedChildren="Nữ"
              />
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
              {imageUrl && (
                <div className="mb-4">
                  <img
                    src={imageUrl}
                    alt="Current product"
                    className="w-40 h-40 object-cover rounded-md"
                  />
                </div>
              )}
              <Form.Item
                name="thumbnail"
                label={<span className="text-sm">Cập nhật hình ảnh</span>}
              >
                {/* Pass key prop to force re-render when imageUrl changes */}
                <ImageUpload
                  onChange={handleImageChange}
                  key={imageUrl}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button
            onClick={handleClose}
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