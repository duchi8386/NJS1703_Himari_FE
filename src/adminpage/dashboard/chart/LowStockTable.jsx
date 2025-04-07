import React from 'react';
import {
    InboxOutlined,
    LoadingOutlined,
    ExclamationCircleOutlined,
    WarningOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';

const LowStockTable = ({ data, isLoading }) => {
    // If loading, show a spinner
    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Chi tiết sản phẩm sắp hết hàng</h2>
                    <div className="text-blue-500">
                        <LoadingOutlined style={{ fontSize: '20px' }} spin />
                    </div>
                </div>
                <div className="px-5 py-20 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-500 font-medium">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    // If no data or empty array, show a message
    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Chi tiết sản phẩm sắp hết hàng</h2>
                </div>
                <div className="px-5 py-16 flex flex-col items-center justify-center text-gray-400">
                    <InboxOutlined style={{ fontSize: '48px', color: '#d1d5db' }} />
                    <p className="mt-4 text-gray-500 font-medium">Không có sản phẩm nào sắp hết hàng</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Chi tiết sản phẩm sắp hết hàng</h2>
                <div className="text-gray-500 text-sm font-medium">
                    {data.length} sản phẩm
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="w-full border-collapse table-auto">
                        <thead className="sticky top-0 z-20">
                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600">
                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    Tên sản phẩm
                                </th>
                                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    Số lượng
                                </th>
                                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((product, index) => (
                                <tr
                                    key={index}
                                    className={`
                                        transition-colors duration-200
                                        ${product.quantity === 0
                                            ? "hover:bg-gray-50"
                                            : product.quantity <= product.threshold / 2
                                                ? "hover:bg-red-50"
                                                : "hover:bg-yellow-50"
                                        }
                                    `}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`
                                                flex-shrink-0 h-10 w-10 rounded-md 
                                                flex items-center justify-center
                                                ${product.quantity === 0
                                                    ? "bg-gray-100 text-gray-600"
                                                    : product.quantity <= product.threshold / 2
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                }
                                            `}>
                                                <InboxOutlined style={{ fontSize: '20px' }} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ID: {product.id || index + 1}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {product.quantity === 0 ? (
                                            <div className="text-md font-medium text-gray-600">
                                                0
                                            </div>
                                        ) : (
                                            <div className={`
                                                text-md font-medium
                                                ${product.quantity <= product.threshold / 2
                                                    ? 'text-red-600'
                                                    : 'text-yellow-600'
                                                }
                                            `}>
                                                {product.quantity}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {product.quantity === 0 ? (
                                            <span className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                <CloseCircleOutlined className="mr-1" /> Hết hàng
                                            </span>
                                        ) : product.quantity <= product.threshold / 2 ? (
                                            <span className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                <ExclamationCircleOutlined className="mr-1" /> Rất thấp
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                <WarningOutlined className="mr-1" /> Thấp
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 text-right">
                Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
            </div>
        </div>
    );
};

export default LowStockTable;