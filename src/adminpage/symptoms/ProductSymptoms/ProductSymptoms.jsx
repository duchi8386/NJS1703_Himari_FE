import React, { useState, useEffect, useCallback } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductSympTable from "./ProductSymptomComponent/ProductSympTable";
import ProductSympAdd from "./ProductSymptomComponent/ProductSympAdd";
import ProductSympEdit from "./ProductSymptomComponent/ProductSympEdit";
import ProductSymptomAPI from "../../../service/api/productSymptomAPI";
import ProductAPI from "../../../service/api/productAPI";
import partSymptomAPI from "../../../service/api/partSymptom";

const ProductSymptoms = () => {
  // State declarations
  const [state, setState] = useState({
    productSymptoms: [],
    products: [],
    symptoms: [],
    loading: false,
    productsLoading: false,
    symptomsLoading: false,
    isAddModalVisible: false,
    isEditModalVisible: false,
    currentProductSymptom: null,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false
    }
  });

  // Destructure state for cleaner code
  const {
    productSymptoms, products, symptoms,
    loading, productsLoading, symptomsLoading,
    isAddModalVisible, isEditModalVisible, currentProductSymptom,
    pagination
  } = state;

  // Update state helper function
  const updateState = (newState) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  // Fetch product symptoms with pagination parameters
  const fetchProductSymptoms = useCallback(async () => {
    updateState({ loading: true });
    try {
      // Pass pagination parameters to the API call
      const response = await ProductSymptomAPI.getProductSymptom(
        pagination.current,
        pagination.pageSize
      );

      if (response && response.data) {
        const { data, metaData } = response.data;

        updateState({
          productSymptoms: data,
          pagination: {
            current: metaData.currentPage,
            pageSize: metaData.pageSize,
            total: metaData.totalCount,
            totalPages: metaData.totalPages,
            hasNext: metaData.hasNext,
            hasPrevious: metaData.hasPrevious
          }
        });
      } else {
        message.error("Không thể lấy dữ liệu liên kết sản phẩm-triệu chứng");
      }
    } catch (error) {
      console.error("Error fetching product symptoms:", error);
      message.error("Lỗi khi tải dữ liệu: " + (error.message || "Không xác định"));
    } finally {
      updateState({ loading: false });
    }
  }, [pagination.current, pagination.pageSize]);

  // Fetch products with memoization
  const fetchProducts = useCallback(async () => {
    updateState({ productsLoading: true });
    try {
      const response = await ProductAPI.getProducts(1, 50);
      console.log("Products response:", response);
      if (response?.data?.data) {
        const productList = response.data.data.data.map(item => ({
          id: item.id,
          name: item.productName
        }));
        updateState({ products: productList });
      } else {
        message.error("Không thể lấy dữ liệu sản phẩm");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Lỗi khi tải dữ liệu sản phẩm: " + (error.message || "Không xác định"));
    } finally {
      updateState({ productsLoading: false });
    }
  }, []);

  // Fetch symptoms with memoization
  const fetchSymptoms = useCallback(async () => {
    updateState({ symptomsLoading: true });
    try {
      const response = await partSymptomAPI.getPartSymptoms(1, 100);
      console.log("Symptoms response:", response);
      if (response?.data) {
        const symptomList = response.data.data.map(item => ({
          id: item.id,
          name: item.name,
          bodyPartId: item.bodyPartId
        }));
        updateState({ symptoms: symptomList });
      } else {
        message.error("Không thể lấy dữ liệu triệu chứng");
      }
    } catch (error) {
      console.error("Error fetching symptoms:", error);
      message.error("Lỗi khi tải dữ liệu triệu chứng: " + (error.message || "Không xác định"));
    } finally {
      updateState({ symptomsLoading: false });
    }
  }, []);

  // Error handler for API calls
  const handleApiError = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    message.error(`${defaultMessage}: ${error.message || "Không xác định"}`);
  };

  // CRUD Operations
  const handleAddProductSymptom = async (newProductSymptom) => {
    updateState({ loading: true });
    try {
      const response = await ProductSymptomAPI.addProductSymptom(newProductSymptom);
      if (response) {
        message.success("Thêm liên kết sản phẩm-triệu chứng thành công");
        updateState({ isAddModalVisible: false });
        fetchProductSymptoms();
      }
    } catch (error) {
      handleApiError(error, "Lỗi khi thêm liên kết");
    } finally {
      updateState({ loading: false });
    }
  };

  const handleUpdateProductSymptom = async (updatedProductSymptom) => {
    updateState({ loading: true });
    try {
      const response = await ProductSymptomAPI.updateProductSymptom(updatedProductSymptom);
      if (response) {
        message.success("Cập nhật liên kết sản phẩm-triệu chứng thành công");
        updateState({ isEditModalVisible: false });
        fetchProductSymptoms();
      }
    } catch (error) {
      handleApiError(error, "Lỗi khi cập nhật liên kết");
    } finally {
      updateState({ loading: false });
    }
  };

  const handleDeleteProductSymptom = async (id) => {
    updateState({ loading: true });
    try {
      await ProductSymptomAPI.deleteProductSymptom(id);
      message.success("Xóa liên kết sản phẩm-triệu chứng thành công");
      fetchProductSymptoms();
    } catch (error) {
      handleApiError(error, "Lỗi khi xóa liên kết");
    } finally {
      updateState({ loading: false });
    }
  };

  // UI Event Handlers
  const handleTableChange = (newPagination) => {
    // Update pagination state first, which will trigger a re-fetch via useEffect
    updateState({
      pagination: {
        ...pagination,
        current: newPagination.current,
        pageSize: newPagination.pageSize
      }
    });
  };

  const showEditModal = (productSymptom) => {
    updateState({
      currentProductSymptom: productSymptom,
      isEditModalVisible: true
    });
  };

  // Initial data loading
  useEffect(() => {
    fetchProductSymptoms();
  }, [fetchProductSymptoms]);

  useEffect(() => {
    fetchProducts();
    fetchSymptoms();
  }, [fetchProducts, fetchSymptoms]);

  // Make sure to refetch data when pagination changes
  useEffect(() => {
    fetchProductSymptoms();
  }, [pagination.current, pagination.pageSize]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý liên kết sản phẩm - triệu chứng</h2>
        <div>
          <Button
            type="primary"
            onClick={() => updateState({ isAddModalVisible: true })}
            className="h-9 rounded"
            icon={<PlusOutlined />}
            loading={productsLoading || symptomsLoading}
            disabled={productsLoading || symptomsLoading}
          >
            Thêm liên kết mới
          </Button>
        </div>
      </div>

      <ProductSympTable
        productSymptoms={productSymptoms}
        loading={loading}
        onEdit={showEditModal}
        onDelete={handleDeleteProductSymptom}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <ProductSympAdd
        isOpen={isAddModalVisible}
        onClose={() => updateState({ isAddModalVisible: false })}
        onAddProductSymptom={handleAddProductSymptom}
        products={products}
        symptoms={symptoms}
        productsLoading={productsLoading}
        symptomsLoading={symptomsLoading}
      />

      <ProductSympEdit
        isOpen={isEditModalVisible}
        onClose={() => updateState({ isEditModalVisible: false })}
        onUpdateProductSymptom={handleUpdateProductSymptom}
        productSymptom={currentProductSymptom}
        products={products}
        symptoms={symptoms}
        productsLoading={productsLoading}
        symptomsLoading={symptomsLoading}
      />
    </div>
  );
};

export default ProductSymptoms;