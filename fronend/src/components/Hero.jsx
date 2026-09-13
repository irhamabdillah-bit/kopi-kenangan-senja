import "../styles/Hero.css";
import heroCoffee from "../assets/hero-coffee.png";

function Hero() {
  return (
    <section className="hero">
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
          <button className="hero-button primary">Lihat Menu</button>
          <button className="hero-button secondary">Pesan Sekarang</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
