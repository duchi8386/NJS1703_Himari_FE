import React from 'react'
import { Button } from 'antd';
const SubscribeSection = () => {
    return (
        <section className="py-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Nhận ưu đãi độc quyền</h2>
            <form className="flex justify-center gap-4">
                <input
                    type="email"
                    placeholder="Your Email"
                    className="px-4 py-2 rounded-md border"
                />
                <Button className="bg-gradient-to-t from-[#FAEBEE] to-[#F0D1D7] px-6 h-[43px] rounded-md text-black">
                    Đăng ký
                </Button>
            </form>
        </section>
    )
}

export default SubscribeSection
