/* eslint-disable react/prop-types */

import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Header } = Layout;
const AdminHeader = ({ collapsed, toggleCollapsed, toggleDarkMode }) => {
  const [roleTitle, setRoleTitle] = useState('');

  useEffect(() => {
    // Get userRole from localStorage
    const userRole = localStorage.getItem('userRole');

    // Set appropriate role title based on user role
    if (userRole === '3') {
      setRoleTitle('Admin');
    } else if (userRole === '4') {
      setRoleTitle('Staff');
    } else {
      setRoleTitle('User');
    }
  }, []);

  return (
    <Header
      style={{
        padding: '0 16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff',
        color: '#000000',
      }}
      className="flex items-center justify-between"
    >
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            color: '#000000',
          }}
        />
        <span className="text-xl font-bold text-gray-800">
          Welcome, {roleTitle}
        </span>
      </div>
    </Header>
  );
};

export default AdminHeader;