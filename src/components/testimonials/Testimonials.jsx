// components/Testimonials.jsx
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const testimonials = [
    {
        id: 1,
        name: "Nguyễn Thanh Hằng",
        review:
            "Sản phẩm rất tuyệt vời! Da mình mềm mại và mịn màng hơn rất nhiều sau khi sử dụng.",
    },
    {
        id: 2,
        name: "Nguyễn Minh Tuấn",
        review:
            "Dịch vụ khách hàng chuyên nghiệp, mình rất hài lòng với chất lượng sản phẩm.",
    },
    {
        id: 3,
        name: "Đỗ Ngọc Anh",
        review:
            "Đây là lần đầu tiên mình tìm được sản phẩm phù hợp với làn da nhạy cảm của mình.",
    },
];

const Testimonials = () => {
    return (
        <section className="py-12 text-center bg-white">
            <h2 className="text-4xl font-semibold mb-6">Phản Hồi Từ Khách Hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className=" rounded-md p-6 bg-gray-50 shadow-sm"
                    >
                        <h4 className="mt-4 px-4 font-semibold text-gray-700 flex justify-start">
                            <Avatar
                                style={{ backgroundColor: "#87d068" }}
                                icon={<UserOutlined />}
                            />
                            <div className="pt-1 px-2">- {testimonial.name}</div>
                        </h4>
                        <p className="text-sm italic w-full pt-4">"{testimonial.review}"</p>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
