// src/components/HeroSection.jsx
import React from "react";
import Imgae from '../../assets/img/hero-photo.png'
const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-r from-purple-50 to-blue-100">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
                {/* Left Content */}
                <div className="">
                    <p className="text-sm font-bold text-purple-500">NEW</p>
                    <h2 className="text-4xl font-bold leading-snug text-gray-800 mt-2">
                        Night Repair Serum
                    </h2>
                    <h1 className="text-5xl font-extrabold mt-4 text-gray-800">Holistic & Beauty</h1>
                    <p className="mt-4 text-gray-600">
                        Naturally beautiful from your heart and body
                    </p>
                </div>
                {/* Right Image */}
                <div>
                    <img
                        src={Imgae}
                        alt="Beauty"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
