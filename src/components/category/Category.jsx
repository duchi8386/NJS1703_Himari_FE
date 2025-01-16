import React from 'react'
import { motion } from "motion/react"
import categories from '../../data/categories';
const Category = () => {
    const box = {
        borderRadius: 5,
    }
    return (
        <div className="bg-white px-[20%] font-PoltawskiNowy">
            {/* Header Logos */}
            <div className="flex justify-around items-center py-8">
                {["Shiseido", "Garnier", "CERAVE", "Banobagi"].map((logo, index) => (
                    <motion.h1
                        style={box}
                        className='cursor-pointer text-center text-4xl text-[#000000]'
                        whileHover={{
                            scale: [null, 1.1, 1.6],
                            transition: {
                                duration: 0.5,
                                times: [0, 0.6, 1],
                                ease: ["easeInOut", "easeOut"],
                            },

                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",

                        }}
                    >
                        {logo}
                    </motion.h1>
                ))}
            </div>

            {/* Categories Section */}
            <div className="px-8">
                <div className="flex justify-between items-center mb-6">
                    <motion.h2
                        className="text-2xl font-semibold text-gray-800 font-PoltawskiNowy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Theo danh mục
                    </motion.h2>
                    <motion.a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 text-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Tất Cả
                    </motion.a>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            style={box}
                            className='flex flex-col items-center space-y-4 cursor-pointer text-center text-4xl text-[#000000]'
                            whileHover={{
                                scale: [null, 1.1, 1.6],
                                transition: {
                                    duration: 0.5,
                                    times: [0, 0.6, 1],
                                    ease: ["easeInOut", "easeOut"],
                                },

                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",

                            }}
                        >
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-full h-[300px] object-cover rounded-lg shadow-md"
                            />
                            <h3 className="text-sm font-medium text-gray-700">
                                {category.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Category
