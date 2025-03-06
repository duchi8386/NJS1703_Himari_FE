import React, { useEffect, useState } from 'react'
import ProductTable from './productTable/ProductTable'
import { Button, message } from 'antd'
import AddProduct from './addProduct/AddProduct'
import ProductAPI from '../../service/api/productAPI'
import CategoryAPI from '../../service/api/CategoryAPI'
import BrandAPI from '../../service/api/brandAPI'
import EditProduct from './editProduct/EditProduct'

const ProductManagement = () => {
  // States for data
  const [products, setProducts] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // States for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // States for loading
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);

  // Fetch all necessary data when component mounts
  useEffect(() => {
    fetchProducts();
    fetchParentCategories();
    fetchBrands();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductAPI.getProducts(1, 50);
      if (response?.data?.data) {
        setProducts(response.data.data.data);
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
      const response = await CategoryAPI.getParentCategory(1, 6);
      // console.log(response)
      if (response?.data?.data?.data) {
        setParentCategories(response.data.data.data);
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
      const response = await CategoryAPI.getCategoryByParentId(parentId, 1, 6);
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
      const response = await BrandAPI.getBrands(1, 6);
      if (response?.data) {
        setBrands(response.data.data);
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

      <ProductTable
        products={products}
        loading={loading}
        onEdit={(product) => {
          setSelectedProduct(product);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDeleteProduct}
      />

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