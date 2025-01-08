// src/components/Footer.jsx
import React from "react";
import instagram from '../../assets/img/Group 9.png'
import youtube from '../../assets/img/Group 11.png'
import X from '../../assets/img/twitter.png'
const Footer = () => {
    return (
        <footer className=" text-white py-12 bg-[#f4fafd] w-full">
            <div className="border-t border-[#85B2DA] "></div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                <div>
                    <h3 className="text-gray-400 text-xl font-bold">CharmAura</h3>
                    <p className="text-gray-400 mt-40">©CharmAura. All Rights Reserved.</p>
                </div>
                <ul className="text-gray-400">
                    <li>Products</li>
                    <li>Moisturizing Serum</li>
                    <li>Aging Care Serum</li>
                </ul>
                <ul className="text-gray-400 pl-40">
                    <li>About</li>
                    <li>Shop List</li>
                    <li>Login</li>
                    <li>Privacy Policy</li>
                    <li>Contact</li>
                    <div className="flex gap-10 pt-2">
                        <img src={instagram} alt="" />
                        <img src={youtube} alt="" />
                        <img src={X} alt="" />
                    </div>

                </ul>
            </div>
        </footer>
    );
};

export default Footer;
