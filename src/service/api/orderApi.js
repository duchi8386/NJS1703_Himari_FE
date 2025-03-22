import axiosInstance from "../instance";

const OrderAPI = {
   getsOrders: async (pageIndex, pageSize, filters) => {
      try {
        const response = await axiosInstance.get("/orders", {
            params: {
                "searchTerm": filters?.searchText || '',
                "page-index": pageIndex,
                "page-size": pageSize,
                "deliveryStatus": filters?.deliveryStatus || '',
                "paymentStatus": filters?.paymentStatus || '',
                "newestFirst": filters?.newestFirst ?? true
            },
        });
        return response.data;
      } catch (error) {   
        console.error("Error fetching orders:", error);
        throw error;
      }
   },
    getOrderById: async (orderId) => {
        try {
            const response = await axiosInstance.get(`/orders/id/${orderId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            throw error;
        }
    },
    getOrderStatistics: async (month, year) => {
        try {
            const response = await axiosInstance.get("/orders/statistics", {
                params: {
                    month,
                    year
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching order statistics:", error);
            throw error;
        }
    },
    updateOrder: async (orderId, updateData) => {
        try {
            const response = await axiosInstance.put("/orders", {
                "orderId": orderId,
                "address": updateData.address,
                "deliveryStatus": updateData.deliveryStatus
            });
            return response.data;
        } catch (error) {
            console.error("Error updating order:", error);
            throw error;
        }
    }
};


export default OrderAPI;
