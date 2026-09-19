import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import Login from "./pages/login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminMessages from "./pages/admin/AdminMessages";

function Home() {
  const location = useLocation();
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

  useEffect(() => {
    if (location.state?.scrollTo === "menu") {
      setTimeout(() => {
        const menuSection = document.getElementById("menu");

        if (menuSection) {
          menuSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [location]);

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

        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
