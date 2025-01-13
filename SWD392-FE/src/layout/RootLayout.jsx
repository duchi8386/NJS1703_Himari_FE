import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <div className="flex justify-center overflow-hidden py-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
