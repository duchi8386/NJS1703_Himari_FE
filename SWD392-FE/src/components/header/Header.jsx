import React, { useState } from 'react'
import ShoppingCart from '../../assets/img/shopping-cart.png'
import LoginModal from '../modal/LoginModal'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

    return (
        <header className='font-sans'>
            {/* Top Announcement */}
            <div className="bg-purple-50 text-center text-sm py-2 text-gray-700">
                Limited time trial set now on sale —<a href="#" className="underline"> Learn more →</a>
            </div>
            {/* Navbar */}
            <div className="flex justify-between items-center px-[5%] py-4">
                <h1 className="text-4xl font-bold text-[#666666]"><Link to=''>CharmAura</Link></h1>
                <nav className='py-8'>
                    <ul className="flex space-x-8 text-gray-700">
                        <li><div className="text-[#666666] cursor-pointer" onClick={toggleModal}>Tài Khoản</div></li>
                        <li><div className="text-[#666666]">Sản Phẩm</div></li>
                        <li><div className="text-[#666666]">Về Chúng Tôi</div></li>
                        <Link to="/cart" className="text-xl cursor-pointer"><img src={ShoppingCart} alt="" /></Link>
                    </ul>
                </nav>
            </div>
            <LoginModal isOpen={isModalOpen} onClose={toggleModal} />
        </header>
    );
}

export default Header;
