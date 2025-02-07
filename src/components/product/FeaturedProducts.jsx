import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { moneyFormatter } from "../../utils/moneyFormatter.js";

const FeaturedProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="group">
          <div className="relative bg-[#FDF1F0] p-3 rounded-lg">
            {/* Discount badge */}
            {product.discount > 0 && (
              <div className="absolute top-0 left-0 bg-[#95AD9C] text-white px-2 py-1 text-sm rounded">
                {product.discount}%
              </div>
            )}

            {/* Wishlist button */}
            <button className="absolute top-1 right-1 p-2 rounded-full hover:bg-white/50 transition-colors">
              <HeartOutlined className="text-gray-600" />
            </button>

            {/* Product Image */}
            <div className="flex justify-center items-center h-40 mb-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full object-contain"
              />
            </div>
          </div>
          {/* Product Info */}
          <div className="text-center mt-5">
            <h3 className="text-gray-800 font-medium mb-2 line-clamp-2">
              {product.name}
            </h3>
            <div>
              <div className="text-[#2A5B45] font-bold text-lg">
                {moneyFormatter(product.price)}
                {product.discount > 0 && (
                  <p className="text-gray-500 text-sm line-through">
                    {moneyFormatter(product.originalPrice)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedProducts;
