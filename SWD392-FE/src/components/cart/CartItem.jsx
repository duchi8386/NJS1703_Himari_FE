import React from 'react'

const CartItem = ({ title, price, color, imageSrc }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 border-b font-Prompt">
            {/* Details */}
            <div className='flex flex-col md:flex-row gap-4 md:gap-12'>
                {/* Image */}
                <img src={imageSrc} alt={title} className="w-full md:w-[60%] object-cover" />
                <div className="flex-1 space-y-4 w-full">
                    <h3 className="font-semibold text-[#17183B]">{title}</h3>
                    <div className="flex gap-1 text-sm text-gray-500">Color: <p className='text-[#17183B]'>{color}</p></div>
                    {/* Quantity Control */}
                    <div className="flex items-center gap-4">
                        <div className='border flex gap-4'>
                            <button className="px-3 py-1">-</button>
                            <span>1</span>
                            <button className="px-3 py-1">+</button>
                        </div>
                        {/* Remove */}
                        <button className="text-red-500 text-sm">Xóa</button>
                    </div>
                </div>
            </div>
            {/* Price */}
            <div className="font-semibold text-gray-700 justify-center">Rs. {price}/-</div>
        </div>
    );
};

export default CartItem
