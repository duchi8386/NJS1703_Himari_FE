import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message } from "antd";
import BrandAPI from "../../../service/api/brandAPI";
import ImageUploadBrand from "../../../components/ImageUploadBrand/ImageUploadBrand";

const { TextArea } = Input;

const BrandEdit = ({ isOpen, onClose, onSuccess, brand }) => {
  const [form] = Form.useForm();
  const [brandImage, setBrandImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentBrandId, setCurrentBrandId] = useState(null);

  // Reset form and state when a different brand is opened
  useEffect(() => {
    if (isOpen && brand) {
      form.setFieldsValue({
        brandName: brand.brandName,
        description: brand.description,
        image: brand.image ? 'has-image' : undefined,
      });

      setBrandImage(null);
      setCurrentBrandId(brand.id);
    }
  }, [isOpen, brand, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setUploading(true);

      // Upload image to Firebase if a new file is selected
      let finalImageUrl = brand.image;
      if (brandImage) {
        const response = await BrandAPI.uploadToFirebase(brandImage);
        finalImageUrl = response.data.data;
      }

      // Create updated brand object
      const updatedBrand = {
        id: brand.id,
        brandName: values.brandName,
        description: values.description,
        image: finalImageUrl
      };

      // Call API to update brand
      const response = await BrandAPI.updateBrand(updatedBrand);

      if (response.statusCode === 200) {
        message.success("Cập nhật thương hiệu thành công");
        onSuccess();
        onClose();
      } else {
        message.error("Không thể cập nhật thương hiệu");
      }
    } catch (error) {
      message.error("Cập nhật thương hiệu thất bại");
      console.error("Error in updating brand:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (file) => {
    setBrandImage(file);
  };

  return (
    <Modal
      title="Chỉnh sửa thương hiệu"
      open={isOpen}
      onCancel={onClose}
      okText="Cập nhật"
      onOk={handleUpdate}
      okButtonProps={{ loading: uploading }}
      maskClosable={false}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="brandName"
          label="Tên thương hiệu"
          rules={[{ required: true, message: "Vui lòng nhập tên thương hiệu" }]}
        >
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả thương hiệu" }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả thương hiệu" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh thương hiệu"
        >
          {/* Add key prop to force remounting when brand changes */}
          <ImageUploadBrand
            key={`brand-image-${currentBrandId}`}
            initialImage={brand?.image}
            onImageChange={handleImageChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandEdit;