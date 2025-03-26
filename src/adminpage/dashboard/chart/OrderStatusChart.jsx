import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrderStatusChart = ({ data, isLoading }) => {
    // Màu sắc có ý nghĩa cho từng trạng thái - Green for success, Orange for failed
    const statusColors = {
        'Thành công': '#10b981',
        'Thất bại': '#f59e0b',
    };

    // If loading, show a spinner
    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Tỷ lệ trạng thái đơn hàng</h2>
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
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Tỷ lệ trạng thái đơn hàng</h2>
                </div>
                <div className="px-5 py-20 flex items-center justify-center text-gray-500">
                    Không có dữ liệu trạng thái đơn hàng
                </div>
            </div>
        );
    }

    // Calculate total for percentage
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Tỷ lệ trạng thái đơn hàng</h2>
            </div>
            <div className="px-5 pt-4 pb-6 flex flex-col items-center">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => {
                                const percent = ((value / total) * 100).toFixed(0);
                                return `${name}: ${percent}%`;
                            }}
                            outerRadius={90}
                            innerRadius={50}
                            fill="#8884d8"
                            dataKey="value"
                            paddingAngle={3}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={statusColors[entry.name] || '#3b82f6'}
                                    stroke="none"
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [
                                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value),
                                name
                            ]}
                            contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }}
                        />
                        <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OrderStatusChart;