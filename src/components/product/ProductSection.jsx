import React from 'react'
import products from './Products'

const ProductSection = () => {
    return (
        <section className="py-12">
            <h2 className="text-2xl font-semibold text-center mb-6">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-md p-4 bg-white hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-40 w-full object-cover rounded-md"
                            />
                            <span className="absolute top-0 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
                                {product.discount}
                            </span>
                        </div>
                        <h3 className="mt-4 font-semibold flex justify-center font-Poppins text-xl">{product.name}</h3>
                        <p className="mt-2 text-[#0A4535] text-2xl font-bold flex justify-center">{product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductSection
