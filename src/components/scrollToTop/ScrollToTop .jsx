import { useEffect, useState } from "react";
import { Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const smoothScrollToTop = () => {
    const scrollStep = -window.scrollY / 65; // Chia nhỏ khoảng cách cuộn
    const scrollAnimation = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };
    requestAnimationFrame(scrollAnimation);
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<ArrowUpOutlined />}
      onClick={smoothScrollToTop}
      className={`fixed bottom-14 right-7 transition-all duration-500 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    />
  );
};

export default ScrollToTop;
