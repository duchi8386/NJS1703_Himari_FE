import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import BrandAPI from "../../../service/api/brandAPI";

const { TextArea } = Input;

const BrandAdd = ({ isOpen, onClose, onAddBrand }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();

      // Check if image is uploaded
      if (fileList.length === 0) {
        message.error("Vui lòng tải lên hình ảnh thương hiệu");
        return;
      }

      setUploading(true);

      // Upload image to Firebase if a file is selected
      let imageUrl = "";
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const response = await BrandAPI.uploadToFirebase(fileList[0].originFileObj);
        imageUrl = response.data.url;
      }

      // Create brand data object
      const brandData = {
        brandName: values.brandName,
        description: values.description,
        image: imageUrl
      };

      // Call the parent component's add function
      await onAddBrand(brandData);

      // Reset form and close modal
      handleCancel();
    } catch (error) {
      console.error("Error in adding brand:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setImageUrl("");
    onClose();
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
      setImageUrl("");
    },
    beforeUpload: (file) => {
      // Only allow image upload
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Bạn chỉ có thể tải lên file hình ảnh!');
        return Upload.LIST_IGNORE;
      }

      // Create temporary URL for preview
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFileList([{
        uid: "-1",
        name: file.name,
        status: "done",
        originFileObj: file,
      }]);
      return false;
    },
    fileList,
    listType: "picture",
    maxCount: 1,
  };

  return (
    <Modal
      title="Thêm thương hiệu mới"
      open={isOpen}
      onCancel={handleCancel}
      okText="Thêm"
      onOk={handleAdd}
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
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandAdd;