import React from 'react'
import HeroSection from '../components/hero/heroSection'
import Features from '../components/features/features'
import Testimonials from '../components/testimonials/Testimonials'
import SectionWithAnimation from '../components/animate/SectionWithAnimation'
import Concept from '../components/concept/Concept'
import ProductSection from '../components/product/ProductSection'
import AboutUsSection from '../components/aboutus/aboutusSection'
import SubscribeSection from '../components/subscribe/SubscribeSection'
import Category from '../components/category/Category'
const HomePage = () => {
    document.title = 'Trang Chủ'

    return (
        <div>
            <SectionWithAnimation>
                <HeroSection />
            </SectionWithAnimation>
            <SectionWithAnimation>
                <Features />
            </SectionWithAnimation>
            {/* concept */}
            <SectionWithAnimation>
                <Concept />
            </SectionWithAnimation>
            {/* category */}
            <SectionWithAnimation>
                <Category />
            </SectionWithAnimation>
            {/* Product */}
            <SectionWithAnimation>
                <ProductSection />
            </SectionWithAnimation>
            {/* phản hồi từ khách hàng*/}
            <SectionWithAnimation>
                <Testimonials />
            </SectionWithAnimation>
            {/* About us */}
            <SectionWithAnimation>
                <AboutUsSection />
            </SectionWithAnimation>
            <SectionWithAnimation>
                <SubscribeSection />
            </SectionWithAnimation>
        </div>
    )
}

export default HomePage
