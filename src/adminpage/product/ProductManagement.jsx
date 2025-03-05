import React, { useEffect, useState } from 'react'
import ProductTable from './productTable/ProductTable'
import { Button } from 'antd'
import AddProduct from './addProduct/AddProduct'
import ProductAPI from '../../service/api/productAPI'

const ProductManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await ProductAPI.getProducts(1, 20)
      console.log("san pham:", response);
      if (response?.data) {
        setProducts(response?.data?.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

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

      <ProductTable products={products} />
      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}

export default ProductManagement