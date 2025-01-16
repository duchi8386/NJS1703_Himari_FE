import React from 'react'
import { Button } from 'antd';
import ConceptImage from '../../assets/img/concept.png';
import Background from '../../assets/img/background.png';
const Concept = () => {
    return (
        <section className="bg-[#f4fafd] py-16 px-8"
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className='font-PoltawskiNowy'>
                    <p className="text-black text-center text-3xl font-bold ">
                        Kem dưỡng trắng da<br /> toàn thân Fab Vitamin C
                    </p>
                    <p className="text-black mt-4 text-center text-xl">
                        Mục đích của việc sử dụng Fab Vitamin C giúp dưỡng trắng da giúp da căng bóng mịn màng hơn
                    </p>
                    <div className='flex justify-center'>
                        <Button className="mt-10 w-[200px] h-[43px] py-3 bg-[#F6BDC8] text-black font-Poppins text-xl rounded-full shadow-md">
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
    )
}

export default Concept
