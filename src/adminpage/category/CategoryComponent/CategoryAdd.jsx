import React from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const CategoryAdd = ({ isOpen, onClose, onAddCategory, parentCategories }) => {
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.validateFields()
      .then((values) => {
        // Create new category object
        const newCategory = {
          id: Date.now(), // Tạm thời sử dụng timestamp, sau này sẽ do server sinh
          ...values,
          // parentCategoryName sẽ được thêm trong component cha
        };

        onAddCategory(newCategory);
        message.success("Thêm danh mục thành công");
        handleCancel();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Thêm danh mục mới"
      open={isOpen}
      onCancel={handleCancel}
      okText="Thêm"
      onOk={handleAdd}
      maskClosable={false}
      width={600}
    >
      <Form form={form} layout="vertical" initialValues={{ parentCategoryId: null }}>
        <Form.Item
          name="categoryName"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
        >
          <TextArea rows={4} placeholder="Nhập mô tả danh mục" />
        </Form.Item>

        <Form.Item
          name="parentCategoryId"
          label="Danh mục cha"
        >
          <Select placeholder="Chọn danh mục cha (nếu có)">
            <Option value={null}>Không có</Option>
            {parentCategories.map(category => (
              <Option key={category.id} value={category.id}>{category.categoryName}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryAdd;