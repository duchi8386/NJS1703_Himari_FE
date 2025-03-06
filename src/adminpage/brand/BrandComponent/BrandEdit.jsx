import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const BrandEdit = ({ isOpen, onClose, onUpdateBrand, brand }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

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

  const handleUpdate = () => {
    form.validateFields()
      .then((values) => {
        // Kiểm tra xem có hình ảnh không
        if (fileList.length === 0 && !imageUrl) {
          message.error("Vui lòng tải lên hình ảnh thương hiệu");
          return;
        }

        // Giả lập việc upload hình ảnh lên Firebase và nhận URL
        // Trong thực tế, bạn sẽ cần thay thế bằng API upload hình ảnh thực
        const fakeUpload = () => {
          return new Promise((resolve) => {
            // Nếu file là mới upload, giả lập việc upload và lấy URL
            if (fileList.length > 0 && fileList[0].originFileObj) {
              setTimeout(() => {
                resolve(imageUrl);
              }, 500);
            } else {
              // Nếu không có file mới, giữ lại URL cũ
              resolve(brand.image);
            }
          });
        };

        fakeUpload().then(imageUrl => {
          // Create updated brand object
          const updatedBrand = {
            ...brand,
            brandName: values.brandName,
            description: values.description,
            image: imageUrl
          };

          onUpdateBrand(updatedBrand);
          onClose();
        });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
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