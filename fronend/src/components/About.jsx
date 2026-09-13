import "../styles/About.css";
import coffeeImage from "../assets/hero-coffee.png";

function About() {
  return (
    <section className="about" id="about">
      {/* BACKGROUND */}

      <img
        className="about-background"
        src={coffeeImage}
        alt="Kopi Kenangan Senja"
      />

      <div className="about-overlay"></div>

      {/* CONTENT */}

      <div className="about-container">
        {/* LEFT CONTENT */}

        <div className="about-content">
          <div className="about-label">
            <span></span>
            ABOUT US
          </div>

          <h2>
            Bukan Sekadar Kopi,
            <br />
            <strong>Tapi Sebuah Cerita.</strong>
          </h2>

          <p className="about-description">
            Kopi Kenangan Senja hadir untuk menciptakan tempat sederhana yang
            bisa menemani setiap perjalanan dan cerita Anda.
          </p>

          <p className="about-description second">
            Kami memilih biji kopi berkualitas dan mengolahnya dengan penuh
            perhatian untuk menghadirkan rasa yang nikmat di setiap cangkir.
          </p>

          {/* STATS */}

          <div className="about-stats">
            <div className="about-stat">
              <h3>
                10<span>+</span>
              </h3>
              <p>Pilihan Kopi</p>
            </div>

            <div className="about-stat">
              <h3>
                5K<span>+</span>
              </h3>
              <p>Pelanggan</p>
            </div>

            <div className="about-stat">
              <h3>
                100<span>%</span>
              </h3>
              <p>Biji Berkualitas</p>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}

        <div className="about-visual">
          <div className="about-image-card">
            <img src={coffeeImage} alt="Secangkir kopi" />

            <div className="about-image-overlay"></div>

            <div className="about-card-content">
              <span>KOPI KENANGAN SENJA</span>

              <h3>
                Crafted With
                <br />
                Passion.
              </h3>

              <p>
                Setiap cangkir dibuat dengan perhatian untuk memberikan
                pengalaman kopi terbaik.
              </p>
            </div>
          </div>

          {/* DECORATION */}

          <div className="about-circle"></div>

          <div className="about-small-line"></div>
        </div>
      </div>
    </section>
  );
}

export default About;
