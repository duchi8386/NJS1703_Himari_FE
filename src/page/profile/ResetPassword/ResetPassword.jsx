import React, { useState } from "react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic validation và submit form ở đây
  };

  return (
    <div className="flex gap-4">
      <form onSubmit={handleSubmit} className="space-y-4 justify-center ">
        <div className="flex items-center gap-4">
          <label className="w-36 text-gray-700">Mật khẩu cũ</label>
          <div>
            <div className="flex justify-between items-center w-80 mb-1">
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
              />
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">Mật khẩu không đúng</p>
            )}
          </div>
          <a href="#" className="text-sm text-gray-500 hover:underline">
            Forgot Password ?
          </a>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-36 text-gray-700">Mật khẩu mới</label>
          <div className="flex-1 ">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className=" px-3 py-1.5 border w-80 border-gray-300 rounded text-sm"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">Mật khẩu không hợp lệ</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-36 text-gray-700">Xác nhận mật khẩu</label>
          <div className="flex-1">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-80 px-3 py-1.5 border border-gray-300 rounded text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                Mật khẩu không trùng khớp
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="px-6 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
