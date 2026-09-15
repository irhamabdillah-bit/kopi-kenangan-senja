import { useState } from "react";
import "../styles/Contact.css";
import coffeeImage from "../assets/hero-coffee.png";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim pesan.");
      }
      setStatus({
        type: "success",
        message: "Pesan berhasil dikirim. Terima Kasih!",
      });
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };
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

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">NAMA</label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">EMAIL</label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Anda"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">PESAN</label>

                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tulis pesan Anda..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="contact-button"
                disabled={loading}
              >
                <span>{loading ? "Mengirim..." : "Kirim Pesan"}</span>

                <span className="button-arrow">→</span>
              </button>
              {status.message && (
                <p className={`contact-status ${status.type}`}>
                  {status.message}
                </p>
              )}
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
