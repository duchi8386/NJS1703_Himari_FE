import React from 'react'
import { Button } from 'antd';
import AboutsImage from '../../assets/img/hero-photo.png';
import Background from '../../assets/img/background.png';
const AboutUsSection = () => {
    return (
        <section className="py-12 bg-pink-50"
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="mx-[10%] flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Câu chuyện về chúng tôi</h2>
                    <p className="text-center font-poppins text-xl">
                        Himari ra đời với mong muốn mang đến giải pháp chăm sóc da an toàn, lành tính và hiệu quả từ thiên nhiên. Chúng tôi tin rằng vẻ đẹp thật sự nằm ở sự tự tin
                        và sức khỏe của làn da. Mỗi sản phẩm của chúng tôi là
                        kết tinh từ tình yêu dành cho vẻ đẹp tự nhiên và cam kết phát triển bền vững. Hãy cùng Himari khám phá và tỏa sáng theo cách riêng của bạn
                    </p>
                    <div className='flex justify-center'>
                        <Button className="mt-10 w-[158px] h-[43px] py-3 bg-[#F6BDC8] text-black font-Poppins text-xl rounded-full">
                            Xem thêm
                        </Button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img
                        src={AboutsImage}
                        alt="About Us"
                        className="rounded-md"
                    />
                </div>
            </div>
        </section>
    )
}

export default AboutUsSection;
