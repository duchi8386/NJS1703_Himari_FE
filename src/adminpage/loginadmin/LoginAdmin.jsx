import { Button, Card, Divider } from "antd";
import { GoogleOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const LoginAdmin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (response) => {
    console.log("✅ Google Response:", response);

    try {
      // Lấy credential (idToken) từ response
      const idToken = response.credential;
      console.log("✅ ID Token:", idToken);

      // Gọi API login
      const backendResponse = await axios.post(
        "http://wizlab.io.vn:12345/api/v1/auth/login/google/oauth",
        // { idToken } // ✅ Gửi idToken trong một object
        idToken, // ✅ Gửi idToken trong một object
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("✅ Backend Response:", backendResponse.data);

      // Truy cập đúng cấu trúc của phản hồi
      const { accessToken, refreshToken } = backendResponse.data.data;
      console.log("✅ Access Token:", accessToken);
      console.log("✅ Refresh Token:", refreshToken);

      // Giải mã token để lấy userId
      const decodedToken = jwtDecode(accessToken);
      console.log(decodedToken);

      // // Lấy role từ decodedToken
      // const role =
      //   decodedToken[
      //     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      //   ];
      // console.log("✅ Role:", role);

      // // Kiểm tra role
      // if (role === "ADMIN") {
      //   console.log("✅ Người dùng là ADMIN.");
      // } else if (role === "USER") {
      //   console.log("✅ Người dùng là USER.");
      // } else {
      //   console.log("❌ Role không xác định.");
      // }
      const userId = Number(decodedToken.UserId);
      console.log("✅ User ID:", userId);

      // Lưu accessToken vào localStorage
      localStorage.setItem("accessToken", accessToken);

      // Đăng nhập thành công, chuyển hướng đến trang chính
      login();
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("❌ Google login failed:", error);
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
          Chỉ dành cho Admin
        </div>
      </Card>
    </div>
  );
};

export default LoginAdmin;
