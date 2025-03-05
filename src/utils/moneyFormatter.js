// export const moneyFormatter = (value, discount) => {
//     if (value == undefined) return "$ 0.00";
//     return `$ ${Number(value - value * (discount ?? 0)/100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
//   };

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Hoặc phiên bản đơn giản hơn nếu bạn chỉ muốn thêm dấu phẩy ngăn cách
export const formatVND = (amount) => {
  return amount.toLocaleString("vi-VN") + " VNĐ";
};
