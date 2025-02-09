import React from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaHandHolding } from "react-icons/fa";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
const Features = () => {



    return (
        <section className="bg-white py-12 text-center">
            <p className="text-4xl mb-6 flex justify-center">
                Các sản phẩm chăm sóc da tự nhiên của chúng tôi được chế tạo bằng<br />
                khoa học xanh tiên tiến<br /> để mang đến trải nghiệm chăm sóc da sang trọng tuyệt đỉnh
            </p>
            <div className="flex justify-center space-x-20">
                <div className="flex gap-3">
                    <p className="text-3xl"><AiOutlineGlobal /></p>
                    <p>Lâu dài và bền vững</p>
                </div>
                <div className="flex gap-3">
                    <div className="text-3xl"><FaHandHolding /></div>
                    <p>Được chế tác một cách tỉ mỉ <br />cho tất cả các loại da</p>
                </div>
                <div className="flex gap-3">
                    <p className="text-3xl"><FaRegFaceSmileBeam /></p>
                    <p>Dễ chịu với làn da</p>
                </div>
            </div>
        </section>
    );
};

export default Features;