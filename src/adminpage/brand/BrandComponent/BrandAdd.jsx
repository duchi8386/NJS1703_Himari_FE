import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import BrandAPI from "../../../service/api/brandAPI";
import ImageUploadBrand from "../../../components/ImageUploadBrand/ImageUploadBrand";

const { TextArea } = Input;

const BrandAdd = ({ isOpen, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [brandImage, setBrandImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();

      // Validate image exists
      if (!brandImage) {
        message.error("Vui lòng tải lên hình ảnh thương hiệu");
        return;
      }

      setUploading(true);

      // Upload image to Firebase
      const uploadResponse = await BrandAPI.uploadToFirebase(brandImage);
      const imageUrl = uploadResponse.data.data;

      // Create brand object
      const brandData = {
        brandName: values.brandName,
        description: values.description,
        image: imageUrl
      };

      // Call API to create brand
      const response = await BrandAPI.createBrand(brandData);

      if (response.statusCode === 201 || response.statusCode === 200) {
        message.success("Thêm thương hiệu mới thành công");
        form.resetFields();
        setBrandImage(null);
        onSuccess();
        onClose();
      } else {
        message.error("Không thể thêm thương hiệu");
      }
    } catch (error) {
      message.error("Thêm thương hiệu thất bại");
      console.error("Error in creating brand:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (file) => {
    setBrandImage(file);
    // Update form field to avoid validation error
    form.setFieldsValue({ image: file ? 'image-exists' : undefined });
  };

  return (
    <Modal
      title="Thêm thương hiệu mới"
      open={isOpen}
      onCancel={onClose}
      okText="Thêm mới"
      onOk={handleCreate}
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
          rules={[{ required: true, message: "Vui lòng tải lên hình ảnh thương hiệu" }]}
          valuePropName="image"
        >
          <ImageUploadBrand onImageChange={handleImageChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandAdd;