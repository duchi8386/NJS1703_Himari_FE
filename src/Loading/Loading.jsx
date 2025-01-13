import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Loading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Đặt thời gian loading tối thiểu là 500ms

    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-grey bg-opacity-80 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
};

export default Loading;