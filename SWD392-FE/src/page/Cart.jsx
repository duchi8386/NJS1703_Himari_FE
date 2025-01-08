import React from "react";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
    document.title = 'Giỏ Hàng'
    return (
        <div className="bg-gray-50 min-h-screen p-6">
            {/* Header */}
            <h1 className="text-2xl font-semibold mb-6">Giỏ Hàng</h1>

            {/* Main Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Single Item */}
                    <CartItem
                        title="Lorem Ipsum"
                        price="350"
                        color="Gunnared beige"
                        imageSrc="https://via.placeholder.com/150"
                    />
                    <CartItem
                        title="Lorem Ipsum"
                        price="350"
                        color="Lysed bright green"
                        imageSrc="https://via.placeholder.com/150"
                    />

                    {/* Discount Section */}
                    <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-blue-800">
                            <span className="font-bold"></span> Giảm giá ngay 10% khi sử dụng Thẻ ghi nợ
                            Federal Bank khi chi tiêu tối thiểu 150 đô la. TCA.
                        </p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Tạm Tính</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <p>Thành Tiền</p>
                            <p>Rs. 700/-</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p>Giảm Giá</p>
                            <p>Rs. 42/-</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p>Vận chuyển</p>
                            <p>Free</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p>Mã giảm giá sử dụng</p>
                            <p>$0.00</p>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between font-semibold">
                        <p>Tổng Tiền</p>
                        <p>Rs. 658/-</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Dự kiến ​​giao hàng vào ngày <span className="font-semibold">01 tháng 02 năm 2023</span>
                    </p>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Cart;
