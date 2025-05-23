import React, { useEffect, useState } from 'react'
import ProductTable from './productTable/ProductTable'
import { Button, message, Pagination, Input, Space } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import AddProduct from './addProduct/AddProduct'
import ProductAPI from '../../service/api/productAPI'
import CategoryAPI from '../../service/api/CategoryAPI'
import BrandAPI from '../../service/api/brandAPI'
import EditProduct from './editProduct/EditProduct'

const { Search } = Input;

const ProductManagement = () => {
  // States for data
  const [products, setProducts] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Pagination states
  const [productPagination, setProductPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const [categoryPagination, setCategoryPagination] = useState({
    current: 1,
    pageSize: 35,
    total: 0
  });

  const [brandPagination, setBrandPagination] = useState({
    current: 1,
    pageSize: 30,
    total: 0
  });

  // States for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // States for loading
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all necessary data when component mounts
  useEffect(() => {
    fetchProducts();
    fetchParentCategories();
    fetchBrands();
  }, [productPagination.current, productPagination.pageSize]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response;

      if (searchQuery) {
        // Sử dụng API tìm kiếm nếu có từ khóa
        response = await ProductAPI.searchProducts(
          productPagination.current,
          productPagination.pageSize,
          searchQuery
        );
      } else {
        // Sử dụng API lấy tất cả sản phẩm nếu không có từ khóa
        response = await ProductAPI.getProducts(
          productPagination.current,
          productPagination.pageSize
        );
      }

      if (response?.data?.data) {
        setProducts(response.data.data.data);
        setProductPagination({
          ...productPagination,
          current: response.data.data.metaData.currentPage,
          pageSize: response.data.data.metaData.pageSize,
          total: response.data.data.metaData.totalCount
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Fetch parent categories
  const fetchParentCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await CategoryAPI.getParentCategory(
        categoryPagination.current,
        categoryPagination.pageSize
      );

      if (response?.data?.data?.data) {
        setParentCategories(response.data.data.data);
        setCategoryPagination({
          ...categoryPagination,
          total: response.data.data.totalRecords || 0
        });
      }
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      message.error('Không thể tải danh mục cha');
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fetch child categories by parent ID
  const fetchChildCategories = async (parentId) => {
    try {
      setLoadingCategories(true);
      const response = await CategoryAPI.getCategoryByParentId(
        parentId,
        categoryPagination.current,
        categoryPagination.pageSize
      );

      if (response?.data?.data?.data) {
        setChildCategories(response.data.data.data);
      }
    } catch (error) {
      console.error('Error fetching child categories:', error);
      message.error('Không thể tải danh mục con');
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fetch brands
  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);
      const response = await BrandAPI.getBrands(
        brandPagination.current,
        brandPagination.pageSize
      );

      if (response?.data) {
        setBrands(response.data.data);
        setBrandPagination({
          ...brandPagination,
          total: response.data.totalRecords || 0
        });
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      message.error('Không thể tải danh sách thương hiệu');
    } finally {
      setLoadingBrands(false);
    }
  };

  // Handle successful product addition
  const handleProductAdded = () => {
    fetchProducts(); // Refresh product list
    setIsAddModalOpen(false);
  };

  // Handle edit product
  const handleEditProduct = async (values, productId) => {
    try {
      const updateData = {
        id: productId,
        productName: values.productName,
        description: values.description,
        price: parseFloat(values.price),
        quantity: values.quantity || 0,
        imageUrl: values.imageUrl,
        categoryId: values.childCategory,
        brandId: values.brand,
        gender: values.gender || true
      };

      const response = await ProductAPI.UpdateProducts(updateData);

      if (response.status === 200) {
        message.success('Cập nhật sản phẩm thành công!');
        setIsEditModalOpen(false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm!');
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await ProductAPI.DeleteProduct(productId);
      if (response.status === 200) {
        message.success('Xóa sản phẩm thành công!');
        fetchProducts(); // Refresh danh sách sản phẩm
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Có lỗi xảy ra khi xóa sản phẩm!');
    }
  };

  // Handle product pagination change
  const handleProductPageChange = (page, pageSize) => {
    setProductPagination({
      ...productPagination,
      current: page,
      pageSize: pageSize
    });
  };

  const handleSearch = async (value) => {
    setSearchQuery(value);
    setLoading(true);

    // Reset về trang đầu tiên khi tìm kiếm
    setProductPagination(prev => ({
      ...prev,
      current: 1
    }));

    try {
      if (value.trim() === '') {
        // Nếu từ khóa trống, lấy tất cả sản phẩm
        await fetchProducts();
        return;
      }

      const response = await ProductAPI.searchProducts(1, productPagination.pageSize, value);

      if (response?.data?.data) {
        setProducts(response.data.data.data);

        // Cập nhật thông tin phân trang từ kết quả tìm kiếm
        if (response.data.data.metaData) {
          setProductPagination({
            ...productPagination,
            current: response.data.data.metaData.currentPage,
            total: response.data.data.metaData.totalCount
          });
        }
      } else {
        setProducts([]);
        setProductPagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error('Error searching products:', error);
      message.error('Không thể tìm kiếm sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý reset tìm kiếm
  const handleResetSearch = () => {
    setSearchQuery('');
    setProductPagination({
      ...productPagination,
      current: 1
    });
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalOpen(true)}
            className="h-9 rounded"
          >
            + Thêm sản phẩm mới
          </Button>
        </div>
      </div>

      {/* Phần tìm kiếm được cải thiện */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow flex items-center space-x-4 flex-wrap">
        <Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          allowClear
          enterButton
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 300 }}
          loading={loading}
        />

        <Button
          icon={<ReloadOutlined />}
          onClick={handleResetSearch}
          title="Làm mới"
        >
          Làm mới
        </Button>
      </div>

      <ProductTable
        products={products}
        loading={loading}
        onEdit={(product) => {
          setSelectedProduct(product);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDeleteProduct}
        pagination={false}
      />

      {/* Add pagination control for products */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={productPagination.current}
          pageSize={productPagination.pageSize}
          total={productPagination.total}
          onChange={handleProductPageChange}
          showSizeChanger
          pageSizeOptions={['5', '10', '20', '50']}
          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`}
        />
      </div>

      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        parentCategories={parentCategories}
        childCategories={childCategories}
        brands={brands}
        onFetchChildCategories={fetchChildCategories}
        onProductAdded={handleProductAdded}
        loadingCategories={loadingCategories}
        loadingBrands={loadingBrands}
      />

      <EditProduct
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        productData={selectedProduct}
        parentCategories={parentCategories}
        childCategories={childCategories}
        brands={brands}
        onFetchChildCategories={fetchChildCategories}
        onEditProduct={handleEditProduct}
        loadingCategories={loadingCategories}
        loadingBrands={loadingBrands}
      />
    </div>
  )
}

export default ProductManagement