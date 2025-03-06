import React from 'react';
import { Table, Button, Tag, Space, Popconfirm, Image } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const BlogTable = ({ 
  blogs, 
  onEdit, 
  onDelete,
  onView
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
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Published' ? 'success' : 'warning'}>
          {status}
        </Tag>
      ),
      width: 100,
      align: 'center',
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
      <Table 
        columns={columns}
        dataSource={blogs}
        rowKey="id"
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