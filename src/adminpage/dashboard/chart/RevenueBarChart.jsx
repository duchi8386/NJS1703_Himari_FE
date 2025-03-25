import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueBarChart = ({ data }) => {
    const [timeRange, setTimeRange] = useState('month'); // 'day', 'month', 'quarter', 'year'

    useEffect(() => {
        // Xử lý thay đổi khoảng thời gian tại đây
        // Trong ứng dụng thực tế, bạn sẽ gọi API dựa trên timeRange
        // fetchData(timeRange).then(data => setData(data));
    }, [timeRange]);
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Doanh thu theo {timeRange === 'day' ? 'ngày' : timeRange === 'month' ? 'tháng' : timeRange === 'quarter' ? 'quý' : 'năm'}</h2>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="text-sm px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="day">Theo ngày</option>
                    <option value="month">Theo tháng</option>
                    <option value="quarter">Theo quý</option>
                    <option value="year">Theo năm</option>
                </select>
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