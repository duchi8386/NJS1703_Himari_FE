import { Card } from "antd";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { moneyFormatter } from "../../utils/moneyFormatter.js";
import sampleProducts from "../../data/sampleProducts.js";
import { useCustomNavigate } from "../../hooks/customNavigate.jsx";

const ProductCard = () => {
  const viewMode = "grid";
  const navigate = useCustomNavigate(); // Thêm hook navigate
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="relative group"
          >
            {/* {product.discount > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-2 z-10 rounded-tr-lg rounded-bl-lg">
                -{product.discount}%
              </div>
            )} */}
            {product.isBestSeller && (
              <div className="absolute top-2 right-2 bg-white/90 text-gray-700 px-3 py-1 z-10 rounded-md text-sm font-medium shadow-sm">
                Bán chạy
              </div>
            )}
            <Card
              hoverable
              styles={{
                body: {
                  height: "100%",
                  width: "100%",
                  padding: "0",
                },
              }}
            >
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
                      <FaStar className="text-black mr-1" size={16} />
                      <span className="text-white text-sm">
                        {product.rating}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      {/* Tên sản phẩm - Inter */}
                      <h3 className="text-white font-poppins font-semibold text-lg max-w-[70%] truncate">
                        {product.name}
                      </h3>
                      {/* Giá - System UI */}
                      <div className="text-white font-poppins font-bold">
                        {moneyFormatter(product.price)}
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
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
