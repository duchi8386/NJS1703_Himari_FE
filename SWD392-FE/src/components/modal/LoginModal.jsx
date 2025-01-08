import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative flex">
                {/* Cột trái - Logo và menu */}
                <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-6">
                    <div className="flex items-center mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="text-pink-500">CHARM</span>AURA
                        </h1>
                    </div>
                    <ul className="space-y-4 text-lg">
                        <li
                            className={`font-bold ${!showForgotPassword && !showRegister ? 'text-black' : 'text-gray-600 cursor-pointer hover:text-black'}`}
                            onClick={() => {
                                setShowForgotPassword(false);
                                setShowRegister(false);
                            }}
                        >
                            Đăng nhập
                        </li>
                        <li
                            className={`text-gray-600 cursor-pointer hover:text-black ${showForgotPassword ? 'font-bold text-black' : ''}`}
                            onClick={() => {
                                setShowForgotPassword(true);
                                setShowRegister(false);
                            }}
                        >
                            Quên mật khẩu
                        </li>
                        <li
                            className={`text-gray-600 cursor-pointer hover:text-black ${showRegister ? 'font-bold text-black' : ''}`}
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
                    {/* Nút đóng */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
                    >
                        ✖
                    </button>

                    {!showForgotPassword && !showRegister && (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-center">ĐĂNG NHẬP</h2>
                            <form className="flex flex-col gap-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-bold text-gray-700 mb-2"
                                    >
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Nhập email của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-bold text-gray-700 mb-2"
                                    >
                                        Mật khẩu*
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Nhập mật khẩu của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
                                >
                                    ĐĂNG NHẬP
                                </button>
                            </form>
                        </>
                    )}

                    {showForgotPassword && (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-center">Quên mật khẩu</h2>
                            <form className="flex flex-col gap-6">
                                <div>
                                    <label
                                        htmlFor="forgot-email"
                                        className="block text-sm font-bold text-gray-700 mb-2"
                                    >
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        id="forgot-email"
                                        placeholder="Nhập email của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
                                >
                                    Gửi yêu cầu
                                </button>
                            </form>
                        </>
                    )}

                    {showRegister && (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
                            <form className="flex flex-col gap-4">
                                <div>
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-bold text-gray-700 mb-2"
                                    >
                                        Họ của bạn*
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        placeholder="Nhập họ của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="last-name"
                                        className="block text-sm font-bold text-gray-700 mb-2"
                                    >
                                        Tên của bạn*
                                    </label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        placeholder="Nhập tên của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-bold text-gray-700 mb-2"
                                    >
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="Nhập số điện thoại của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Giới tính
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                className="mr-2"
                                            />
                                            Nữ
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                className="mr-2"
                                            />
                                            Nam
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="register-email"
                                        className="block text-sm font-bold text-gray-700 mb-2"
                                    >
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        id="register-email"
                                        placeholder="Nhập email của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="register-password"
                                        className="block text-sm font-bold text-gray-700 mb-2"
                                    >
                                        Mật khẩu*
                                    </label>
                                    <input
                                        type="password"
                                        id="register-password"
                                        placeholder="Nhập mật khẩu của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
                                >
                                    Đăng ký
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginModal;


