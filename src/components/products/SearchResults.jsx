import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { Content } from "antd/es/layout/layout";
import { FaBars } from "react-icons/fa";
import { GrGrid } from "react-icons/gr";
import ProductCard from "../ProductCard/ProductCard";

const SearchResults = ({
  products,
  onSearch,
  searchQuery,
  totalItems,
  viewMode,
  setViewMode,
}) => {
  const noResult = products.length === 0;

  return (
    <div>
      <Content className="sm:py-8 pb-8 pt-2 px-4 bg-white">
        <div className="flex sm:flex-row flex-col justify-between items-center mb-6">
          <h2 className="text-2xl sm:mb-0 mb-12 font-semibold">
            {searchQuery ? (
              <span>
                Results for "<span className="font-bold">{searchQuery}</span>"
              </span>
            ) : (
              "Tất cả sản phẩm"
            )}
          </h2>
          <div className="flex items-center justify-between space-x-4 w-full sm:w-[400px]">
            <Search
              placeholder="Search"
              defaultValue={searchQuery}
              className="w-full"
              onSearch={onSearch}
            />
            {/* <Button
              icon={<GrGrid />}
              onClick={() => setViewMode("grid")}
              type={viewMode === "grid" ? "primary" : "default"}
              className="view-button"
            />
            <Button
              icon={<FaBars />}
              onClick={() => setViewMode("list")}
              type={viewMode === "list" ? "primary" : "default"}
              className="md:inline-block hidden view-button"
            /> */}
          </div>
        </div>

        {!noResult ? (
          <ProductCard products={products} viewMode={viewMode} />
        ) : (
          <div className="text-center mt-8">
            <h1 className="text-xl font-medium">
              No results found. Try searching for something else.
            </h1>
          </div>
        )}
      </Content>
    </div>
  );
};

export default SearchResults;
