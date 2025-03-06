import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const BrandAdd = ({ isOpen, onClose, onAddBrand }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleAdd = () => {
    form.validateFields()
      .then((values) => {
        // Kiểm tra xem có upload hình ảnh không
        if (fileList.length === 0) {
          message.error("Vui lòng tải lên hình ảnh thương hiệu");
          return;
        }

        // Giả lập việc upload hình ảnh lên Firebase và nhận URL
        // Trong thực tế, bạn sẽ cần thay thế bằng API upload hình ảnh thực
        const fakeUpload = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(imageUrl || "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2Fdefault-brand.png?alt=media");
            }, 500);
          });
        };

        fakeUpload().then(imageUrl => {
          // Create new brand object
          const newBrand = {
            id: Date.now(), // Tạm thời sử dụng timestamp, sau này sẽ do server sinh
            brandName: values.brandName,
            description: values.description,
            image: imageUrl
          };

          onAddBrand(newBrand);
          handleCancel();
        });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
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
      // Chỉ cho phép upload hình ảnh
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Bạn chỉ có thể tải lên file hình ảnh!');
        return Upload.LIST_IGNORE;
      }

      // Tạo URL tạm thời để hiển thị preview
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFileList([file]);
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