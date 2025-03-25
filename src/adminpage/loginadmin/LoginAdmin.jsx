import { Button, Card, Divider, message } from "antd";
import { GoogleOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useGoogleAuth } from "../../service/api/googleAuth";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleAuth = useGoogleAuth();

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const idToken = response.credential;
      const { accessToken, refreshToken, role, userId, isAuthorized } =
        await handleGoogleAuth(idToken);

      if (isAuthorized) {
        // Use AuthContext login to manage state
        await login(accessToken, refreshToken, userId, role);
        navigate("/admin/dashboard");
      } else {
        message.error("Bạn không có quyền truy cập vào trang quản trị");
      }
    } catch (error) {
      console.error("❌ Google login failed:", error);
      message.error("Đăng nhập thất bại. Vui lòng thử lại.");
    }
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
        <GoogleLogin onSuccess={handleGoogleLoginSuccess}>
          <Button
            icon={<GoogleOutlined />}
            size="large"
            className="w-full h-12 flex items-center justify-center text-base"
          >
            Đăng nhập bằng Google
          </Button>
        </GoogleLogin>

        <div className="mt-6 text-center text-sm text-gray-600">
          <LockOutlined className="mr-2" />
          Chỉ dành cho Admin và Staff
        </div>
      </Card>
    </div>
  );
};

export default LoginAdmin;
