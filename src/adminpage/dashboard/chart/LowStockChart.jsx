import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const LowStockChart = ({ data }) => {
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
                            contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }}
                            formatter={(value, name) => [value, name === 'quantity' ? 'Số lượng hiện tại' : 'Ngưỡng tối thiểu']}
                        />
                        <Legend />
                        <Bar
                            dataKey="quantity"
                            name="Số lượng hiện tại"
                            fill="#fb7185"
                            radius={[0, 4, 4, 0]}
                            barSize={12}
                            stackId="a"
                        />
                        <Bar
                            dataKey="threshold"
                            name="Ngưỡng tối thiểu"
                            fill="#a5b4fc"
                            radius={[0, 4, 4, 0]}
                            barSize={12}
                            opacity={0.4}
                            stackId="b"
                        />
                        {data.map((item, index) => (
                            <ReferenceLine
                                key={index}
                                y={item.name}
                                stroke={item.quantity <= item.threshold / 2 ? "#ef4444" : "#f59e0b"}
                                strokeWidth={1}
                                strokeDasharray="3 3"
                                isFront={true}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LowStockChart;