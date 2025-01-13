import React from "react";
import Background from '../../assets/img/background.png'
const Footer = () => {
    return (
        <footer className="bg-pink-100 py-10"
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Himari</h2>
                    <p className="text-sm text-gray-600 mt-2">COSMETIC</p>
                    <p className="mt-4 text-sm text-gray-700">
                        Chúng tôi đam mê giúp bạn trân trọng vẻ đẹp tự nhiên của mình và có
                        được làn da sáng khỏe.
                    </p>
                    <p className="mt-6 text-sm text-gray-600">© 2025 Himari, Inc.</p>
                </div>

                {/* Middle Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Thông tin shop</h3>
                    <p className="mt-4 text-sm text-gray-700">
                        Lô E2a-7, Đường D1, Đ. Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ
                        Chí Minh
                    </p>
                    <p className="mt-2 text-sm text-gray-700">090 1614 568</p>
                    <p className="mt-2 text-sm text-gray-700">littlejoystore@store.vn</p>
                </div>

                {/* Right Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Liên hệ với chúng tôi</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <a
                                href="https://facebook.com/himari"
                                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="mr-2">📘</span> fb.com/himari
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://instagram.com/himari"
                                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="mr-2">📸</span> instagram.com/himari
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
