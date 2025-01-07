import React from 'react'
import ProductCard from '../components/productCart/ProductCart'
import ConceptImage from '../assets/img/concept-image.png'
import Productone from '../assets/img/product-1.png'
import TrialImage from '../assets/img/trial-image.png'
const HomePage = () => {
    return (
        <div>
            {/* concept */}
            <section className="bg-[#f4fafd] py-16 px-8">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Concept</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    {/* Image */}
                    <div>
                        <img
                            src={ConceptImage}
                            alt="Concept"
                            className="rounded-full shadow-md"
                        />
                    </div>
                    {/* Text */}
                    <div>
                        <p className="text-gray-700">
                            Our products, which primarily contain organic ingredients, will help restore your skin's natural strength.
                        </p>
                        <p className="text-gray-500 mt-4">
                            This text is dummy. It is included to check the size, amount, spacing, and line spacing of characters.
                            This text is dummy. It is included to check the size, amount, spacing, and line spacing of characters.
                            This text is dummy. It is included to check the size, amount, spacing, and line spacing of characters.
                        </p>
                        <button className="mt-4 px-6 py-2 bg-white shadow-md  text-[#93B0CA] rounded-full text-sm cursor-pointer">
                            View More
                        </button>
                    </div>
                </div>
            </section>

            {/* Product */}
            <section className="bg-[#f4fafd] py-16 px-8" id="products">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Products</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProductCard
                        image={Productone}
                        title="Moisturizing Serum"
                        description="This is dummy text for testing."
                    />
                    <ProductCard
                        image={Productone}
                        title="Anti-aging Serum"
                        description="This is dummy text for testing."
                    />
                </div>

                {/* Trial */}
                <div className="mt-16 mx-36 bg-[#f4fafd] shadow-md rounded-lg p-6 flex gap-24 items-center">
                    <img src={TrialImage} alt="Trial Product" className="w-2/4 rounded-lg" />
                    <div className="ml-6 ">
                        <div className='flex justify-center'>
                            <p className="text-sm font-bold text-white bg-[#D4C9EC] rounded-full flex justify-center pt-4 w-[82px] h-[50.67px]">TRIAL</p>
                        </div>
                        <h3 className="text-2xl font-bold text-[#666666] mt-2">
                            Try the 7-day trial sample first!
                        </h3>
                        <h3 className="text-2xl font-bold text-[#666666] mt-2 flex justify-center">
                            Trial Sample
                        </h3>
                        <p className="text-[#666666] text-3xl mt-2 flex justify-center">¥980 <p className='text-xs pt-4'>(tax included)</p></p>
                        <div className='flex justify-center'>
                            <button className="mt-4 px-6 py-2 border-[#93B0CA] border text-[#93B0CA] rounded-full text-sm cursor-pointer">
                                View More
                            </button>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

export default HomePage
