import React from 'react';
import { Table, Button, Space, Popconfirm, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const BlogCategoryTable = ({
  categories,
  onEdit,
  onDelete,
  loading,
  pagination,
  onChange,
  onSearch,
  searchQuery
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
        dataSource={categories}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => onChange({ current: page, pageSize }),
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showTotal: (total) => `Tổng ${total} danh mục`
        }}
      />
    </div>
  );
};

export default BlogCategoryTable;