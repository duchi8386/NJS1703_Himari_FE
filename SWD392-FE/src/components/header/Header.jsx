import React from 'react'
import ShoppingCart from '../../assets/img/shopping-cart.png'
const Header = () => {
    return (
        <header className='font-sans'>
            {/* Top Announcement */}
            <div className="bg-purple-50 text-center text-sm py-2 text-gray-700">
                Limited time trial set now on sale —<a href="#" className="underline"> Learn more →</a>
            </div>
            {/* Navbar */}
            <div className="flex justify-between items-center px-[5%] py-4">
                <h1 className="text-4xl font-bold text-[#666666]">Adéna</h1>
                <nav className='py-8'>
                    <ul className="flex space-x-8 text-gray-700">
                        <li><a href="#products" className="text-[#666666]">Products</a></li>
                        <li><a href="#about" className="text-[#666666]">About</a></li>
                        <li><a href="#shoplist" className="text-[#666666]">Shop List</a></li>
                        <div className="text-xl"><img src={ShoppingCart} alt="" /></div>
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default Header
