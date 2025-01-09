import React from "react";
import CartItem from "../components/cart/CartItem";
import CartEmpty from "./CartEmpty";
import testProduct from "../assets/img/testProduct.png"

const Cart = () => {
    document.title = 'Giỏ Hàng'

    const cartItems = [1];

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            {/* Header */}
            <h1 className="text-2xl font-semibold mb-6">Giỏ Hàng</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 ">
                    {cartItems.length === 0 ? (
                        <CartEmpty />
                    ) : (
                        <>
                            {/* Single Item */}
                            <CartItem
                                title="Lorem Ipsum"
                                price="350"
                                color="Gunnared beige"
                                imageSrc={testProduct}
                            />
                            <CartItem
                                title="Lorem Ipsum"
                                price="350"
                                color="Lysed bright green"
                                imageSrc={testProduct}
                            />

                            {/* Discount Section */}
                            <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
                                <p className="text-sm text-blue-800">
                                    <span className="font-bold"></span> Giảm giá ngay 10% khi sử dụng Thẻ ghi nợ
                                    Federal Bank khi chi tiêu tối thiểu 150 đô la. TCA.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-lg font-semibold mb-4 text-[#17183B]">Tạm Tính</h2>
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
                    <div className="flex justify-between font-semibold text-[#17183B]">
                        <p>Tổng Tiền</p>
                        <p>Rs. 658/-</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 flex justify-between">
                        Dự kiến ​​giao hàng vào ngày <span className="font-semibold">01 tháng 02 năm 2025</span>
                    </p>
                    <div className="mt-4">
                        <button className="w-full bg-[#BF6159] text-white py-2 rounded-lg hover:bg-red-600 mt-4">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
