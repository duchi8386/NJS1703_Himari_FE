import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Chatbot from "../components/chatbot/chatbot";
import ScrollToTop from "../components/scrollToTop/ScrollToTop ";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="flex justify-center overflow-hidden py-4">
          <Outlet />
          <Chatbot/>
          <ScrollToTop/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
