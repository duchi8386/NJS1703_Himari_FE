import { Button, Card, Divider } from 'antd';
import { GoogleOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/Logo.png';

const LoginAdmin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Giả lập đăng nhập thành công
    const mockAdminUser = {
      fullName: "Admin User",
      role: "admin",
      email: "admin@example.com"
    };
    
    // Lưu thông tin admin vào localStorage
    localStorage.setItem('adminUser', JSON.stringify(mockAdminUser));
    
    // Chuyển hướng đến trang admin
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <img src={Logo} alt="Logo" className="mx-auto w-20 h-20 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Đăng nhập để tiếp tục</p>
        </div>

        <Divider className="my-6">Đăng nhập với</Divider>

        <Button
          icon={<GoogleOutlined />}
          size="large"
          className="w-full h-12 flex items-center justify-center text-base"
          onClick={handleGoogleLogin}
        >
          Đăng nhập bằng Google
        </Button>

        <div className="mt-6 text-center text-sm text-gray-600">
          <LockOutlined className="mr-2" />
          Chỉ dành cho Admin
        </div>
      </Card>
    </div>
  );
};

export default LoginAdmin;
