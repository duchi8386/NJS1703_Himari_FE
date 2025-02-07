import { Card, Rate } from "antd";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { moneyFormatter } from "../../utils/moneyFormatter.js";
import { useCustomNavigate } from "../../hooks/customNavigate.jsx";

const ProductCard = ({ products }) => {
  const viewMode = "grid";
  const navigate = useCustomNavigate(); // Thêm hook navigate
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="relative group"
          >
            {product.isBestSeller ? (
              <div className="absolute top-2 right-2 bg-white/90 text-gray-700 px-3 py-1 z-10 rounded-md text-sm font-medium shadow-sm">
                Bán chạy
              </div>
            ) : product.discount > 0 ? (
              <div className="absolute top-2 right-2 bg-white/90 text-gray-700 px-3 py-1 z-10 rounded-md text-sm font-medium shadow-sm">
                Đang giảm giá
              </div>
            ) : null}
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
                      <Rate
                        disabled
                        color="#FFD700"
                        allowHalf
                        style={{ fontSize: "14px", color: "black" }}
                        value={product.rating}
                      />
                    </div>
                    <div className="flex justify-between items-end">
                      {/* Tên sản phẩm - Inter */}
                      <h3 className="text-white font-poppins font-semibold text-lg max-w-[70%] truncate">
                        {product.name}
                      </h3>
                      {/* Giá - System UI */}
                      <div className="text-white font-poppins font-bold">
                        {product.discount > 0
                          ? moneyFormatter(
                              product.price * (1 - product.discount / 100)
                            )
                          : moneyFormatter(product.price)}
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
