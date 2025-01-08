import { Card, Tag } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { ArrowRightOutlined } from "@ant-design/icons";
import sampleProducts from "../data/sampleProducts.js";
import { moneyFormatter } from "../utils/moneyFormatter.js";

const ProductPage = () => {
  const viewMode = "grid";

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <div key={product.id} className="relative group">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Rating - Sans Serif */}
                  <div className="flex items-center mb-2 font-sans">
                    <FaStar className="text-yellow-400 mr-1" size={16} />
                    <span className="text-white text-sm">
                      {product.average_rating} ({product.review_count})
                    </span>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Tên sản phẩm - Inter */}
                    <h3 className="text-white font-poppins font-semibold text-lg max-w-[70%] truncate">
                      {product.name}
                    </h3>
                    {/* Giá - System UI */}
                    <div className="text-white font-poppins font-bold">
                      {moneyFormatter(product.price, product.discount)}
                      {product.discount > 0 && (
                        <span className="block text-sm text-gray-300 line-through">
                          {moneyFormatter(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
