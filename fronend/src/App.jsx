import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
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

      <div className="reveal reveal-up">
        <Contact />
      </div>

      <Footer />
    </>
  );
}

export default App;
