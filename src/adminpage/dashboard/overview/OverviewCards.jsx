import React from 'react'

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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d={overviewData?.revenue?.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                    </svg>
                                    {overviewData?.revenue?.percent || "0"}%
                                </span>
                                <span className="text-xs opacity-70 ml-2">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="bg-blue-400 bg-opacity-40 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d={overviewData?.newOrder?.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                    </svg>
                                    {overviewData?.newOrder?.percent || 0}%
                                </span>
                                <span className="text-xs opacity-70 ml-2">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="bg-emerald-400 bg-opacity-40 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d={overviewData?.newUser?.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                    </svg>
                                    {overviewData?.newUser?.percent || 0}%
                                </span>
                                <span className="text-xs opacity-70 ml-2">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="bg-amber-400 bg-opacity-40 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-80">Sản phẩm sắp hết</p>
                            <p className="text-2xl font-bold mt-1">{overviewData?.lowStockProducts?.quantityProduct || 0}</p>
                            <div className="flex items-center mt-2">
                                <span className={`flex items-center ${overviewData?.lowStockProducts?.isIncrease ? 'text-rose-300' : 'text-red-300'} text-sm`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d={overviewData?.lowStockProducts?.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                    </svg>
                                    {overviewData?.lowStockProducts?.percent || 0}%
                                </span>
                                <span className="text-xs opacity-70 ml-2">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="bg-rose-400 bg-opacity-40 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewCards
