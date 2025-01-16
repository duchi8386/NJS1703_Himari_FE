import React, { useEffect, useRef } from "react";
import backgroundImage from '../../assets/img/BannerBackground.png';
import { Button } from "antd";
import { Link } from "react-router-dom";

const HeroSection = () => {


    return (
        <section
            className="relative h-[90vh] w-full flex items-center justify-center font-Poppins"

            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="text-center text-white">
                <h2

                    className="text-3xl md:text-6xl font-bold leading-snug"
                >
                    Nhìn vào bên trong chính<br /> mình và khám phá
                </h2>
                <div >
                    <Button className="mt-10 w-[200px] h-[43px] py-3 bg-gradient-to-t from-[#FAEBEE] to-[#F0D1D7] text-black font-Poppins text-xl">
                        <Link to="/product">Xem bộ sưu tập</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
