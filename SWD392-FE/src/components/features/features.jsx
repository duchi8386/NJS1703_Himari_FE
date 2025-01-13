import React from "react";

const Features = () => {
    return (
        <section className="bg-white py-12 text-center">
            <p className="text-4xl mb-6 flex justify-center">
                Các sản phẩm chăm sóc da tự nhiên của chúng tôi được chế tạo bằng<br />
                khoa học xanh tiên tiến<br /> để mang đến trải nghiệm chăm sóc da sang trọng tuyệt đỉnh
            </p>
            <div className="flex justify-center space-x-8">
                <div>
                    <p>🌿</p>
                    <p>Lâu dài và bền vững</p>
                </div>
                <div>
                    <p>🧴</p>
                    <p>Được chế tác một cách tỉ mỉ cho tất cả các loại da</p>
                </div>
                <div>
                    <p>😊</p>
                    <p>Dễ chịu với làn da</p>
                </div>
            </div>
        </section>
    );
};

export default Features;