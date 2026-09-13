import "../styles/Contact.css";
import coffeeImage from "../assets/hero-coffee.png";

function Contact() {
  return (
    <section className="contact" id="contact">
      {/* Background */}
      <img
        className="contact-background"
        src={coffeeImage}
        alt="Kopi Kenangan Senja"
      />

      <div className="contact-overlay"></div>

      {/* Main Content */}
      <div className="contact-container">
        {/* LEFT CONTENT */}

        <div className="contact-left">
          <div className="contact-label">
            <span></span>
            GET IN TOUCH
          </div>

          <h2>
            Mari Nikmati
            <br />
            <strong>Secangkir Kopi.</strong>
          </h2>

          <p className="contact-description">
            Punya pertanyaan atau ingin berkunjung? Kami siap menyambut Anda.
            Hubungi kami atau datang langsung ke kedai kami.
          </p>

          {/* FORM */}

          <div className="contact-form-wrapper">
            <div className="contact-form-title">
              <div className="form-title-icon">@</div>

              <div>
                <h3>Kirim Pesan</h3>
                <p>Kami akan segera menghubungi Anda.</p>
              </div>
            </div>

            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>NAMA</label>

                  <input type="text" placeholder="Nama Anda" />
                </div>

                <div className="form-group">
                  <label>EMAIL</label>

                  <input type="email" placeholder="Email Anda" />
                </div>
              </div>

              <div className="form-group">
                <label>PESAN</label>

                <textarea rows="4" placeholder="Tulis pesan Anda..."></textarea>
              </div>

              <button type="submit" className="contact-button">
                <span>Kirim Pesan</span>

                <span className="button-arrow">→</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="contact-right">
          <div className="contact-divider"></div>

          <div className="contact-info">
            {/* ALAMAT */}

            <div className="contact-info-item">
              <div className="contact-info-icon">+</div>

              <div className="contact-info-content">
                <span>ALAMAT</span>

                <p>KOMP. sbs Jl. Danau toba raya Harapan Jaya, Bekasi Utara</p>
              </div>
            </div>

            {/* TELEPON */}

            <div className="contact-info-item">
              <div className="contact-info-icon">☎</div>

              <div className="contact-info-content">
                <span>TELEPON</span>

                <p>+62 812 3456 789</p>
              </div>
            </div>

            {/* EMAIL */}

            <div className="contact-info-item">
              <div className="contact-info-icon">@</div>

              <div className="contact-info-content">
                <span>EMAIL</span>

                <p>hello@kopikenangansenja.com</p>
              </div>
            </div>
          </div>

          {/* BOTTOM TEXT */}

          <div className="contact-bottom">
            <span>KOPI KENANGAN SENJA</span>

            <h3>
              Sampai Jumpa
              <br />
              di Kedai Kami.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
