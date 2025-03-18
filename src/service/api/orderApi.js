import axiosInstance from "../instance";

const OrderAPI = {
   getsOrders: async (pageIndex, pageSize) => {
      try {
        const response = await axiosInstance.get("/orders", {
            params: {
                "page-index": pageIndex,
                "page-size": pageSize,
                
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
};


export default OrderAPI;
