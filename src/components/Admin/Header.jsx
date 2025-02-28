/* eslint-disable react/prop-types */

import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';

const { Header } = Layout;
const AdminHeader = ({ collapsed, toggleCollapsed, adminUser, isDarkMode, toggleDarkMode }) => {
  return (
    <Header 
      style={{
        background: isDarkMode ? '#1f2937' : '#ffffff',
        borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0',
        padding: '0 16px',
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
            color: isDarkMode ? '#ffffff' : '#000000',
          }}
        />
        <span className={`ml-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Welcome, {adminUser?.fullName}
        </span>
      </div>
      
      <Button
        type="text"
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleDarkMode}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
          color: isDarkMode ? '#ffffff' : '#000000',
        }}
      />
    </Header>
  );
};

export default AdminHeader; 