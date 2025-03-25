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
      console.log("✅ ID Token:", idToken);

      // Gọi API login
      const backendResponse = await axios.post(
        "https://wizlab.io.vn:9999/api/v1/auth/login/google/oauth",
        // { idToken } // ✅ Gửi idToken trong một object
        idToken, // ✅ Gửi idToken trong một object
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // Truy cập đúng cấu trúc của phản hồi
      const { accessToken, refreshToken } = backendResponse.data.data;

      // Giải mã token để lấy userId và role
      const decodedToken = jwtDecode(accessToken);

      // Lấy role từ decodedToken
      const role =
        decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      console.log("✅ Role:", role);

      const userId = Number(decodedToken.UserId);
      console.log("✅ User ID:", userId);
      console.log("decodetoken", decodedToken);

      // Lưu accessToken và role vào localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", userId);

      // Kiểm tra role
      if (role === "3" || role === "4") {
        // Đăng nhập thành công, chuyển hướng đến trang chính
        login();
        if (role === "3") {
          navigate("/admin/dashboard");
          message.success(`Đăng nhập thành công với vai trò Admin`);
        } else {
          navigate("/admin/orders");
          message.success(`Đăng nhập thành công với vai trò Staff`);
        }

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
