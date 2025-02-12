import React, { useState } from "react";
import { Input, Button, Avatar } from "antd";
import { GrUserManager } from "react-icons/gr";
import Logo from "../../assets/img/Logo.png";
import {
  CloseOutlined,
  SendOutlined,
  PaperClipOutlined,
  PictureOutlined,
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-10 right-20">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          type="primary"
          size="large"
          icon={<MessageOutlined />}
          onClick={() => setIsOpen(!isOpen)}
          className=" flex items-center justify-center bg-white text-blue-500 border-blue-500 hover:bg-blue-50 animate-bounce text-xl rounded-full"
          style={{ minWidth: "60px", height: "60px" }} // Đặt trực tiếp style
        />
      )}

      {/* Chat Window */}
      <div
        className={`absolute bottom-0 right-0 transition-all duration-300 ease-in-out transform
        ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-4 invisible"
        }`}
      >
        <div className="w-[400px] bg-white rounded-xl shadow-lg flex flex-col absolute bottom-5 right-0">
          {/* Header */}
          <div className="bg-white px-4 py-2 flex items-center justify-between border-b rounded-t-xl">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="w-10 h-10" />
            </div>
            <div className="flex-1 mx-2">
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Giờ hoạt động: 8h - 22h"
                className="rounded-full bg-gray-50"
                bordered={false}
              />
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              className="text-gray-500"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-gray-50">
            {/* User Info */}
            <div className="p-3 flex items-center gap-3">
              <Avatar className="bg-[#EADDFF]" size={36}>
                <GrUserManager className="text-gray-600" />
              </Avatar>
              <div>
                <div className="text-sm">Tư vấn</div>
                <div className="text-xs text-gray-500">14:08</div>
              </div>
            </div>

            {/* Messages */}
            <div className="px-3 space-y-3">
              <div className="flex flex-col gap-1">
                <div className="bg-white rounded-lg p-3 max-w-[85%] shadow-sm">
                  <div className="text-sm">
                    Chào bạn duchi! Cảm ơn bạn đã liên hệ đến Hasaki Beauty &
                    Clinic, vui lòng đợi trong ít phút Hasaki sẽ trả lời tin
                    nhắn nhé!!!
                  </div>
                  <div className="text-xs text-gray-500 mt-1">14:08</div>
                </div>
                <div className="bg-white rounded-lg p-3 max-w-[85%] shadow-sm">
                  <div className="text-sm">
                    🌸 Trong thời gian chờ đợi, bạn có thể truy cập Website để
                    mua sắm:
                  </div>
                  <div className="text-xs text-gray-500 mt-1">14:08</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white rounded-b-xl">
            <Input
              placeholder="Nhập nội dung tin nhắn..."
              className="rounded-full bg-gray-50"
              suffix={
                <div className="flex gap-1 mr-2">
                  <Button
                    type="text"
                    className="flex items-center justify-center w-8 h-8 p-0"
                  >
                    <PictureOutlined className="text-gray-500" />
                  </Button>
                  <Button
                    type="text"
                    className="flex items-center justify-center w-8 h-8 p-0"
                  >
                    <PaperClipOutlined className="text-gray-500" />
                  </Button>
                  <Button
                    type="text"
                    className="flex items-center justify-center w-8 h-8 p-0"
                  >
                    <SendOutlined className="text-blue-500" />
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
