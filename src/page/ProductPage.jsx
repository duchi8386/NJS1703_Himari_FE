import { Card, Layout, Tag } from "antd";
import SearchResults from "../components/products/SearchResults.jsx";
import { useState } from "react";
import sampleProducts from "../data/sampleProducts.js";

const ProductPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState(sampleProducts); // Sử dụng sampleProducts làm dữ liệu mặc định
  const [totalItems, setTotalItems] = useState(sampleProducts.length);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    const filtered = sampleProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filtered);
    setSearchQuery(value);
    setTotalItems(filtered.length);
  };

  return (
    <main className="mt-2 min-h-screen mb-40 relative">
      <Layout className="relative">
        <SearchResults
          products={products}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          totalItems={totalItems}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </Layout>
    </main>
  );
};

export default ProductPage;
