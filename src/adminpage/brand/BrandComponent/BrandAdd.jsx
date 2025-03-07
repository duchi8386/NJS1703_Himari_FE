import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import BrandAPI from "../../../service/api/brandAPI";

const { TextArea } = Input;

const BrandAdd = ({ isOpen, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();

      // Validate image exists
      if (fileList.length === 0 || !fileList[0].originFileObj) {
        message.error("Vui lòng tải lên hình ảnh thương hiệu");
        return;
      }

      setUploading(true);

      // Upload image to Firebase
      const uploadResponse = await BrandAPI.uploadToFirebase(fileList[0].originFileObj);
      console.log(uploadResponse)
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
        setFileList([]);
        setImageUrl("");
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
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
          </Upload>
        </Form.Item>

        {imageUrl && (
          <div className="mt-2">
            <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default BrandAdd;