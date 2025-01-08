// src/components/HeroSection.jsx
import React from "react";
import Image from '../../assets/img/hero-photo.png'
import backgroundImage from '../../assets/img/hero-gredient.png'


const HeroSection = () => {
    return (
        <section
            className="relative bg-gradient-to-r from-purple-50 to-blue-100"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >

            <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 md:px-0">
                {/* Left Content */}
                <div className="text-center pl-2  md:text-left pr-0 md:pr-4">
                    <div className="flex justify-center gap-2">
                        <p className="text-sm font-bold text-white flex justify-center border border-white rounded-t-full rounded-b-full p-3 py-4 ">NEW</p>
                        <h2 className="flex justify-center text-3xl md:text-4xl font-bold leading-snug text-white mt-2 font-EBGaramond">
                            Night Repair Serum
                        </h2>
                    </div>

                    <h1 className="flex justify-center text-5xl md:text-7xl font-extrabold mt-4 text-white font-EBGaramond">Holistic <br />& Beauty</h1>
                    <p className="flex justify-center mt-4 text-[#737373]">
                        Naturally beautiful from your heart and body
                    </p>
                </div>
                {/* Right Image */}
                <div className="pl-0 md:pl-4 h-full">
                    <img
                        src={Image}
                        alt="Beauty"
                        className="rounded-lg shadow-lg w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
