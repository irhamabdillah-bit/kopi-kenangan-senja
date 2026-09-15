import "../styles/Hero.css";
import heroCoffee from "../assets/coffee2.png";

function Hero() {
  return (
    <section className="hero" id="home">
      <img
        className="hero-background"
        src={heroCoffee}
        alt="Kopi kenangan senja"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-subtitle">WELCOME TO KOPI KENANGAN SENJA</p>
        <h1>
          Nikmati Setiap Momen
          <br />
          Dalam Secangkir Kopi
        </h1>
        <p className="hero-description">
          Temukan rasa kopi terbaik yang dibuat dengan penuh perhatian untuk
          menemani setiap cerita dan momen berharga Anda.
        </p>
        <div className="hero-buttons">
          <a href="#menu" className="hero-button primary">
            Lihat Menu
          </a>
          <a href="#contact" className="hero-button secondary">
            Pesan Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
