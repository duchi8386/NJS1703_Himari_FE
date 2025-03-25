import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrderStatusChart = ({ data }) => {
    // Màu sắc có ý nghĩa cho từng trạng thái
    const statusColors = ['#10b981', '#f59e0b', '#3b82f6'];

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
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={90}
                            innerRadius={50}
                            fill="#8884d8"
                            dataKey="value"
                            paddingAngle={3}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={statusColors[index % statusColors.length]}
                                    stroke="none"
                                />
                            ))}
                        </Pie>
                        <Tooltip
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