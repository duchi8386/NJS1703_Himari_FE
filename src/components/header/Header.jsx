import React, { useState } from "react";
import ShoppingCart from "../../assets/img/shopping-cart.png";
import LoginModal from "../modal/LoginModal";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import { Avatar, Input } from "antd";
import { FaSearch } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="font-sans">
      {/* Navbar */}
      <div className="flex justify-between items-center px-[5%]">
        <div className="flex gap-3">
          <h1 className="text-4xl font-bold text-[#666666]">
            <Link to="">
              <img src={Logo} alt="" />
            </Link>
          </h1>
        </div>
        <div className="flex w-[50%]">
          <Search
            style={{ height: "500px" }}
            placeholder="input search text"
            enterButton="Search"
            size="large"
          />
        </div>

        <nav className="py-8">
          <ul className="flex items-center justify-end space-x-8 text-gray-700">
            <li className="flex items-center h-10">
              <Link to="/cart" className="flex items-center">
                <img src={ShoppingCart} alt="" className="w-6 h-6" />
              </Link>
            </li>
            <li className="flex items-center h-10">
              <Link
                to="/product"
                className="text-[#666666] text-base hover:text-gray-900"
              >
                Sản Phẩm
              </Link>
            </li>
            <li className="flex items-center h-10">
              <div className="text-[#666666] text-base hover:text-gray-900">
                Về Chúng Tôi
              </div>
            </li>
            <li className="flex items-center h-10">
              <Link to="/blog" className="text-[#666666] text-base hover:text-gray-900">
                Blog
              </Link>
            </li>
            <li className="flex items-center h-10">
              <Avatar
                style={{ backgroundColor: "#eaddff", cursor: "pointer", color: "#666666" }}
                icon={<UserOutlined onClick={toggleModal} />}
              />
            </li>
          </ul>
        </nav>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={toggleModal} />
    </header>
  );
};

export default Header;
