import React from 'react'
import ConceptImage from '../assets/img/concept.png'
import Productone from '../assets/img/product-1.png'
import TrialImage from '../assets/img/trial-image.png'
import HeroSection from '../components/hero/heroSection'
import Features from '../components/features/features'
import products from '../components/product/Products'
import Testimonials from '../components/testimonials/Testimonials'
import Background from '../assets/img/background.png'
import { Button } from 'antd'
const HomePage = () => {
    document.title = 'Trang Chủ'
    return (
        <div>
            <HeroSection />
            <Features />
            {/* concept */}
            <section className="bg-[#f4fafd] py-16 px-8"
                style={{
                    backgroundImage: `url(${Background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    {/* Image */}

                    {/* Text */}
                    <div>
                        <p className="text-gray-700 text-center">
                            Kem dưỡng trắng da toàn thân Fab Vitamin C
                        </p>
                        <p className="text-gray-500 mt-4 text-center">
                            Mục đích của việc sử dụng Fab Vitamin C giúp dưỡng trắng da giúp da căng bóng mịn màng hơn
                        </p>
                        <div className='flex justify-center'>
                            <Button className="mt-10 w-[200px] h-[43px] py-3 bg-[#F6BDC8] text-black font-Poppins text-xl rounded-full">
                                Mua Ngay
                            </Button>
                        </div>

                    </div>
                    <div>
                        <img
                            src={ConceptImage}
                            alt="Concept"

                        />
                    </div>
                </div>
            </section>

            {/* Product */}
            <section className="py-12 bg-gray-50">
                <h2 className="text-2xl font-semibold text-center mb-6">Sản phẩm nổi bật</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-md p-4 bg-white shadow-sm hover:shadow-lg transition"
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-40 w-full object-cover rounded-md"
                                />
                                <span className="absolute top-0 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
                                    {product.discount}
                                </span>
                            </div>
                            <h3 className="mt-4 text-sm font-semibold">{product.name}</h3>
                            <p className="mt-2 text-pink-500 font-bold">{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>
            <Testimonials />
            {/* About us */}
            <section className="py-12 bg-pink-50"
                style={{
                    backgroundImage: `url(${Background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className="mx-[10%] flex flex-col md:flex-row items-center ">
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Câu chuyện về chúng tôi</h2>
                        <p className="text-sm text-center">
                            Nhưng tôi phải giải thích cho bạn biết tất cả những ý tưởng sai lầm này về việc lên án khoái lạc và ca ngợi nỗi đau đã ra đời như thế nào và tôi sẽ cung
                            cấp cho bạn một bản tường trình đầy đủ về hệ thống này, và giải thích những lời dạy thực sự của nhà thám hiểm vĩ đại của chân lý, người xây dựng bậc thầy của hạnh phúc con người.
                            Không ai từ chối, không thích hoặc tránh né khoái lạc.
                        </p>
                        <div className='flex justify-center'>
                            <Button className="mt-10 w-[158px] h-[43px] py-3 bg-[#F6BDC8] text-black font-Poppins text-xl rounded-full">
                                Xem thêm
                            </Button>
                        </div>

                    </div>
                    <div className="md:w-1/2">
                        <img
                            src="/path/to/about-us-image.jpg"
                            alt="About Us"
                            className="rounded-md"
                        />
                    </div>
                </div>
            </section>

            <section className="py-12 text-center ">
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

        </div>
    )
}

export default HomePage
