
import React from "react";

const ProductCard = ({ image, title, description }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img src={image} alt={title} className="mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
            <button className="mt-4 px-6 py-2 bg-white shadow-md  text-[#93B0CA] rounded-full text-sm cursor-pointer">
                Xem thêm
            </button>
        </div>
    );
};

export default ProductCard;
