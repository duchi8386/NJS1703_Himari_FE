import React, { useEffect, useState } from "react";
import ProductsGrid from "../home/ProductGrid";
import sampleProducts from "../../data/sampleProducts";
import FeaturedProducts from "./FeaturedProducts";

const ProductSection = () => {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    // Lọc sản phẩm bestseller và lấy 4 sản phẩm đầu tiên
    const bestSellerProducts = sampleProducts
      .filter((product) => product.isBestSeller)
      .slice(0, 4);

    setBestSellers(bestSellerProducts);
  }, []);
  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Sản phẩm nổi bật
      </h2>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 ">
        <FeaturedProducts products={bestSellers} />
      </div>
    </section>
  );
};

export default ProductSection;
