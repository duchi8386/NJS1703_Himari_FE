import React from 'react'
import {
    DollarCircleOutlined,
    ShoppingOutlined,
    UserOutlined,
    InboxOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';

const OverviewCards = ({ overviewData }) => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-80">Tổng doanh thu</p>
                            <p className="text-2xl font-bold mt-1">{overviewData?.revenue?.revenue || "0.0M"}</p>
                            <div className="flex items-center mt-2">
                                <span className={`flex items-center ${overviewData?.revenue?.isIncrease ? 'text-emerald-300' : 'text-red-300'} text-sm`}>
                                    {overviewData?.revenue?.isIncrease ?
                                        <ArrowUpOutlined className="mr-1" /> :
                                        <ArrowDownOutlined className="mr-1" />
                                    }
                                    {overviewData?.revenue?.percent || "0"}%
                                </span>
                                <span className="text-xs opacity-70 ml-2">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="bg-blue-400 bg-opacity-40 p-3 rounded-full">
                            <DollarCircleOutlined className="text-2xl" />
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-80">Đơn hàng mới</p>
                            <p className="text-2xl font-bold mt-1">{overviewData?.newOrder?.quantityOrder || 0}</p>
                            <div className="flex items-center mt-2">
                                <span className={`flex items-center ${overviewData?.newOrder?.isIncrease ? 'text-emerald-300' : 'text-red-300'} text-sm`}>
                                    {overviewData?.newOrder?.isIncrease ?
                                        <ArrowUpOutlined className="mr-1" /> :
                                        <ArrowDownOutlined className="mr-1" />
                                    }
                                    {overviewData?.newOrder?.percent || 0}%
                                </span>
                                <span className="text-xs opacity-70 ml-2">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="bg-emerald-400 bg-opacity-40 p-3 rounded-full">
                            <ShoppingOutlined className="text-2xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-80">Khách hàng mới</p>
                            <p className="text-2xl font-bold mt-1">{overviewData?.newUser?.quantityUser || 0}</p>
                            <div className="flex items-center mt-2">
                                <span className={`flex items-center ${overviewData?.newUser?.isIncrease ? 'text-amber-300' : 'text-red-300'} text-sm`}>
                                    {overviewData?.newUser?.isIncrease ?
                                        <ArrowUpOutlined className="mr-1" /> :
                                        <ArrowDownOutlined className="mr-1" />
                                    }
                                    {overviewData?.newUser?.percent || 0}%
                                </span>
                                <span className="text-xs opacity-70 ml-2">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="bg-amber-400 bg-opacity-40 p-3 rounded-full">
                            <UserOutlined className="text-2xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-80">Sản phẩm mới</p>
                            <p className="text-2xl font-bold mt-1">{overviewData?.lowStockProducts?.quantityProduct || 0}</p>
                            <div className="flex items-center mt-2">
                                <span className={`flex items-center ${overviewData?.lowStockProducts?.isIncrease ? 'text-purple-300' : 'text-red-300'} text-sm`}>
                                    {overviewData?.lowStockProducts?.isIncrease ?
                                        <ArrowUpOutlined className="mr-1" /> :
                                        <ArrowDownOutlined className="mr-1" />
                                    }
                                    {overviewData?.lowStockProducts?.percent || 0}%
                                </span>
                                <span className="text-xs opacity-70 ml-2">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="bg-purple-400 bg-opacity-40 p-3 rounded-full">
                            <InboxOutlined className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewCards
