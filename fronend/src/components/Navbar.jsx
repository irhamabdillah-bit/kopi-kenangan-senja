import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="#home" className="navbar-logo" onClick={closeMenu}>
        Kopi Kenangan <span>Senja</span>
      </a>
      {/* Desktop Menu */}
      <div className="navbar-menu">
        <a href="#home">Home</a>
        <a href="#about">Tentang Kami</a>
        <a href="#menu">Menu</a>
        <a href="#why-us">Kenapa Kami</a>
        <a href="#contact">Kontak</a>
      </div>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
        <a href="#home" onClick={closeMenu}>
          Home
        </a>
        <a href="#about" onClick={closeMenu}>
          Tentang Kami
        </a>
        <a href="#menu" onClick={closeMenu}>
          Menu
        </a>
        <a href="#why-us" onClick={closeMenu}>
          Kenapa Kami
        </a>
        <a href="#contact" onClick={closeMenu}>
          Kontak
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
