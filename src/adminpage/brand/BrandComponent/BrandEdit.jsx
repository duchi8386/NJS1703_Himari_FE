import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import BrandAPI from "../../../service/api/brandAPI";

const { TextArea } = Input;

const BrandEdit = ({ isOpen, onClose, onUpdateBrand, brand }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen && brand) {
      form.setFieldsValue({
        brandName: brand.brandName,
        description: brand.description,
      });

      // Set image preview if available
      if (brand.image) {
        setImageUrl(brand.image);
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: brand.image,
          },
        ]);
      } else {
        setFileList([]);
        setImageUrl("");
      }
    }
  }, [isOpen, brand, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      setUploading(true);

      // Upload image to Firebase if a new file is selected
      let finalImageUrl = brand.image;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const response = await BrandAPI.uploadToFirebase(fileList[0].originFileObj);
        finalImageUrl = response.data.url;
      }

      // Create updated brand object
      const updatedBrand = {
        ...brand,
        brandName: values.brandName,
        description: values.description,
        image: finalImageUrl
      };

      // Call the parent component's update function
      await onUpdateBrand(updatedBrand);
      onClose();
    } catch (error) {
      console.error("Error in updating brand:", error);
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
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Thay đổi hình ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandEdit;