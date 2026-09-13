import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}

        <div className="footer-brand">
          <h2>
            KOPI KENANGAN <span>SENJA</span>
          </h2>
          <p>Secangkir kopi untuk menemani setiap cerita dan momen berharga.</p>
          <div className="footer-status">
            <span></span>
            OPEN DAILY
          </div>
        </div>
        {/* Navigation */}
        <div className="footer-column">
          <h3>NAVIGASI</h3>
          <a href="#home">Home</a>
          <a href="#about">Tentang Kami</a>
          <a href="#menu">Menu</a>
          <a href="#why-us">Kenapa Kami</a>
          <a href="#contact">Contact</a>
        </div>
        {/* Contact */}
        <div className="footer-column">
          <h3>HUBUNGI KAMI</h3>
          <p>KOMP. SBS JL. Danau Toba Raya Harapan Jaya, Bekasi Utara.</p>
          <p>+623456789</p>
          <p>hello@kopikenangansenja.com</p>
        </div>
        {/* Social */}
        <div className="footer-column footer-social">
          <h3>FOLLOW US</h3>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Whatsap</a>
        </div>
      </div>
      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Kopi Kenangan Senja. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
