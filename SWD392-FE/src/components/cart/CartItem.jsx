import React from 'react'

const CartItem = ({ title, price, color, imageSrc }) => {
    return (
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
            {/* Image */}
            <img src={imageSrc} alt={title} className="w-16 h-16 object-cover" />

            {/* Details */}
            <div className="flex-1">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">Color: {color}</p>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span>1</span>
                <button className="px-3 py-1 bg-gray-200 rounded">+</button>
            </div>

            {/* Price */}
            <p className="font-semibold text-gray-700">Rs. {price}/-</p>

            {/* Remove */}
            <button className="text-red-500 text-sm">Xóa</button>
        </div>
    );
};

export default CartItem
