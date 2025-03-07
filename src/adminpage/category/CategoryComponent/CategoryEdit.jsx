import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const CategoryEdit = ({ isOpen, onClose, onUpdateCategory, category, parentCategories }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen && category) {
      form.setFieldsValue({
        categoryName: category.categoryName,
        description: category.description,
        parentCategoryId: category.parentCategoryId,
      });
    }
  }, [isOpen, category, form]);

  const handleUpdate = () => {
    form.validateFields()
      .then((values) => {
        // Create updated category object with ID for API
        const updatedCategory = {
          id: category.id,
          ...values,
        };

        onUpdateCategory(updatedCategory);
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Lọc ra các danh mục có thể là parent (không bao gồm chính nó và các con của nó)
  const getValidParentCategories = () => {
    if (!category) return parentCategories;

    // Tìm tất cả các ID danh mục con (trực tiếp và gián tiếp)
    const findAllChildrenIds = (categoryId) => {
      const directChildren = parentCategories
        .filter(cat => cat.parentCategoryId === categoryId)
        .map(cat => cat.id);

      let allChildren = [...directChildren];
      directChildren.forEach(childId => {
        const nestedChildren = findAllChildrenIds(childId);
        allChildren = [...allChildren, ...nestedChildren];
      });

      return allChildren;
    };

    const childrenIds = findAllChildrenIds(category.id);
    return parentCategories.filter(cat =>
      cat.id !== category.id && !childrenIds.includes(cat.id)
    );
  };

  return (
    <Modal
      title="Chỉnh sửa danh mục"
      open={isOpen}
      onCancel={onClose}
      okText="Cập nhật"
      onOk={handleUpdate}
      maskClosable={false}
      width={600}
    >
      <Form form={form} layout="vertical">
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
            {getValidParentCategories().map(cat => (
              <Option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryEdit;