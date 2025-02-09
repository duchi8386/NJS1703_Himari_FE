import React, { useState } from "react";
import { Form, Input, Button, Radio, Checkbox } from "antd";
import Logo from "../../assets/img/Logo.png";
import { SendOutlined } from '@ant-design/icons';

const LoginModal = ({ isOpen, onClose }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [form] = Form.useForm();

  if (!isOpen) return null;

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Xử lý submit form ở đây
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative flex">
        {/* Cột trái - Logo và menu */}
        <div className="w-1/3  border-r border-gray-200 p-6">
          <div className="flex justify-center items-center mb-8">
            <img src={Logo} alt="Logo" className="w-32 h-auto" />
          </div>
          <ul className="space-y-4 text-lg">
            <li
              className={`p-2 rounded-md transition-all cursor-pointer
        ${
          !showForgotPassword && !showRegister
            ? "font-bold text-black bg-[#FFFDEC]"
            : "text-gray-600 hover:bg-[#FFFDEC] hover:text-black"
        }`}
              onClick={() => {
                setShowForgotPassword(false);
                setShowRegister(false);
              }}
            >
              Đăng nhập
            </li>
            <li
              className={`p-2 rounded-md transition-all cursor-pointer
        ${
          showForgotPassword
            ? "font-bold text-black bg-[#FFFDEC]"
            : "text-gray-600 hover:bg-[#FFFDEC] hover:text-black"
        }`}
              onClick={() => {
                setShowForgotPassword(true);
                setShowRegister(false);
              }}
            >
              Quên mật khẩu
            </li>
            <li
              className={`p-2 rounded-md transition-all cursor-pointer
        ${
          showRegister
            ? "font-bold text-black bg-[#FFFDEC]"
            : "text-gray-600 hover:bg-[#FFFDEC] hover:text-black"
        }`}
              onClick={() => {
                setShowRegister(true);
                setShowForgotPassword(false);
              }}
            >
              Đăng ký
            </li>
          </ul>
        </div>

        {/* Cột phải - Nội dung động */}
        <div className="w-2/3 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          >
            ✖
          </button>

          {!showForgotPassword && !showRegister && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h2>
              <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                  label="Tài khoản"
                  name="account"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tài khoản!' }
                  ]}
                >
                  <Input 
                    placeholder="Email hoặc số điện thoại"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu!' }
                  ]}
                >
                  <Input.Password 
                    placeholder="Mật khẩu"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    htmlType="submit"
                    className="w-full bg-pink-300 hover:bg-pink-400 text-black border-none h-12 text-lg font-medium rounded-md"
                  >
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}

          {showForgotPassword && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Quên mật khẩu</h2>
              <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                  name="forgotEmail"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email hoặc số điện thoại!' }
                  ]}
                >
                  <Input 
                    placeholder="Email hoặc số điện thoại"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    suffix={
                      <Button 
                        className="bg-transparent border-none text-black hover:bg-transparent"
                        icon={<SendOutlined />}
                        onClick={() => console.log('Gửi mã')}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="otpCode"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mã OTP!' }
                  ]}
                >
                  <Input 
                    placeholder="OTP code"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    htmlType="submit"
                    className="w-full bg-pink-300 hover:bg-pink-400 text-black border-none h-12 text-lg font-medium rounded-md"
                  >
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}

          {showRegister && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  name="emailOrPhone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email hoặc số điện thoại!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập email hoặc số điện thoại"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </Form.Item>

                <div className="flex-1">
                  <Form.Item
                    name="verificationCode"
                    rules={[
                      { required: true, message: "Vui lòng nhập mã xác thực!" },
                    ]}
                  >
                    <Input
                      placeholder="Nhập mã xác thực"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      suffix={
                        <Button
                          className="bg-[#FFFDEC] hover:bg-[#f5f3e3] text-black border-none h-auto"
                          onClick={() => console.log("Lấy mã")}
                          size="large"
                        >
                          Lấy mã
                        </Button>
                      }
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                    {
                      min: 6,
                      max: 32,
                      message: "Mật khẩu phải từ 6-32 ký tự!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu từ 6 - 32 ký tự"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </Form.Item>

                <Form.Item
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                >
                  <Input
                    placeholder="Họ tên"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("Vui lòng đồng ý với điều khoản!"),
                    },
                  ]}
                >
                  <Checkbox className="text-sm">
                    Tôi đã đọc và đồng ý với Điều kiện giao dịch chung và Chính
                    sách bảo mật thông tin của Himan
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    className="w-full bg-pink-300 hover:bg-pink-400 text-black border-none h-12 text-lg font-medium rounded-md"
                  >
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
