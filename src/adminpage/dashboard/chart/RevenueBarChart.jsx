import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueBarChart = ({ data, isLoading }) => {
    const [timeRange, setTimeRange] = useState('month'); // 'day', 'month', 'quarter', 'year'

    // If loading, show a spinner
    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Doanh thu theo {timeRange === 'day' ? 'ngày' : timeRange === 'month' ? 'tháng' : timeRange === 'quarter' ? 'quý' : 'năm'}</h2>
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
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Doanh thu theo {timeRange === 'day' ? 'ngày' : timeRange === 'month' ? 'tháng' : timeRange === 'quarter' ? 'quý' : 'năm'}</h2>
                </div>
                <div className="px-5 py-20 flex items-center justify-center text-gray-500">
                    Không có dữ liệu doanh thu
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Doanh thu theo 6 tháng gần nhất </h2>
            </div>
            <div className="px-5 pt-4 pb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip
                            formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                            contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Bar dataKey="revenue" name="Doanh thu" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueBarChart;