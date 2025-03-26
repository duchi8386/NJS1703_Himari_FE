import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LowStockChart = ({ data, isLoading }) => {
    // If loading, show a spinner
    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Sản phẩm sắp hết hàng</h2>
                </div>
                <div className="px-5 pt-4 pb-6 flex items-center justify-center h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            </div>
        );
    }

    // If no data or empty array, show a message
    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Sản phẩm sắp hết hàng</h2>
                </div>
                <div className="px-5 py-20 flex items-center justify-center text-gray-500">
                    Không có sản phẩm nào sắp hết hàng
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Sản phẩm sắp hết hàng</h2>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-xs text-gray-500 mr-4">Cần nhập thêm</span>
                </div>
            </div>
            <div className="px-5 pt-4 pb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 15, right: 10, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 'dataMax']} // Auto-adjust to max data value
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fontSize: 12 }}
                            width={150} // Increased width for longer product names
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => value.length > 20 ? `${value.substring(0, 18)}...` : value} // Truncate long names
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }}
                            formatter={(value) => [`${value} sản phẩm`, 'Số lượng hiện tại']}
                        />
                        <Bar
                            dataKey="quantity"
                            name="Số lượng hiện tại"
                            fill="#fb7185"
                            radius={[0, 4, 4, 0]}
                            barSize={16}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LowStockChart;