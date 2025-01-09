import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import HeroSection from "../components/hero/heroSection";
import Footer from "../components/footer/Footer";

function RootLayout() {
  return (
    <>
      <Header />
      <HeroSection />
      <main>
        <div className="flex justify-center overflow-hidden py-16">
          <div className="md:w-[85%] w-[95%]">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
