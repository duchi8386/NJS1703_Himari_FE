import React, { useState } from 'react'
import ProductTable from './productTable/ProductTable'
import { Button } from 'antd'
import AddProduct from './addProduct/AddProduct'

const ProductManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

      <ProductTable />
      <AddProduct 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  )
}

export default ProductManagement