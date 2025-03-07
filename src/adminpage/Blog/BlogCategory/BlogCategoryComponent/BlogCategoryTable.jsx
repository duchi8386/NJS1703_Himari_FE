import React from 'react';
import { Table, Button, Tag, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BlogCategoryTable = ({ 
  categories, 
  onEdit, 
  onDelete 
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <span style={{ fontWeight: 500, color: '#1890ff' }}>{name}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Bài Đăng',
      dataIndex: 'postCount',
      key: 'postCount',
      render: (count) => count,
      width: 80,
      align: 'center',
    },
    {
      title: 'Tình Trang',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Tag color={active ? 'success' : 'default'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      ),
      width: 100,
      align: 'center',
    },
    {
      title: 'Hoạt Động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              disabled={record.postCount > 0}
            />
          </Popconfirm>
        </Space>
      ),
      width: 120,
      align: 'center',
    },
  ];

  return (
    <div className="p-6">
      <Table 
        columns={columns}
        dataSource={categories}
        rowKey="id"
        className="bg-white rounded-lg shadow"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} categories`
        }}
      />
    </div>
  );
};

export default BlogCategoryTable;