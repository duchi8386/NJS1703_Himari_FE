import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TopProductsChart = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Top 5 sản phẩm bán chạy</h2>
                <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                    Tháng này
                </span>
            </div>
            <div className="px-5 pt-4 pb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                        <XAxis type="number" axisLine={false} tickLine={false} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fontSize: 12 }}
                            width={100}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                            contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }}
                        />
                        <Bar
                            dataKey="revenue"
                            name="Doanh thu"
                            fill="#f43f5e"
                            radius={[0, 4, 4, 0]}
                            barSize={25}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopProductsChart;