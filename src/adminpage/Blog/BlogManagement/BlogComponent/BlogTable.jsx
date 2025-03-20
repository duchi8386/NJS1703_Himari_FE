import React from 'react';
import { Table, Button, Tag, Space, Popconfirm, Image, Input } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const BlogTable = ({
  blogs,
  loading,
  onEdit,
  onDelete,
  onView,
  onSearch,
  searchQuery
}) => {
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image
          src={image}
          width={60}
          height={40}
          style={{ objectFit: 'cover' }}
          preview={false}
        />
      ),
      width: 80,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title) => <span style={{ fontWeight: 500, color: '#1890ff' }}>{title}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Tác giả',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
          />
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
      width: 150,
      align: 'center',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4">
        <Search
          placeholder="Tìm kiếm blog..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
          defaultValue={searchQuery}
          loading={loading}
          className="max-w-md"
        />
      </div>
      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} blogs`
        }}
      />
    </div>
  );
};

export default BlogTable;