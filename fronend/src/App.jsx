import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";

function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <Hero />

      <div className="reveal reveal-up">
        <About />
      </div>

      <div className="reveal reveal-right">
        <Menu />
      </div>

      <div className="reveal reveal-left">
        <WhyUs />
      </div>

      <Testimonials />

      <div className="reveal reveal-up">
        <Contact />
      </div>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HALAMAN UTAMA */}
        <Route path="/" element={<Home />} />

        {/* HALAMAN ORDER */}
        <Route path="/order" element={<Order />} />

        {/* HALAMAN ORDER BERHASIL */}
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
