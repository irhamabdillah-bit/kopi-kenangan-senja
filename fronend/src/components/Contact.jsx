import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    setSuccess("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim pesan.");
      }

      setSuccess(
        "Pesan berhasil dikirim. Terima kasih sudah menghubungi kami.",
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact error:", err);
      setError(err.message || "Terjadi kesalahan saat mengirim pesan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-intro">
          <p className="contact-label">GET IN TOUCH</p>

          <h2>
            Ada yang ingin
            <br />
            <strong>ditanyakan?</strong>
          </h2>

          <p className="contact-description">
            Kami siap mendengar pertanyaan, kritik, saran, atau kebutuhan kerja
            sama dari Anda.
          </p>

          <div className="contact-note">
            <span>Untuk melakukan pemesanan</span>
            <p>
              Silakan pilih menu yang Anda inginkan, lalu tekan tombol{" "}
              <strong>Pesan</strong>.
            </p>
          </div>

          <div className="contact-details">
            <div>
              <span>EMAIL</span>
              <p>hello@kopikenangansenja.com</p>
            </div>

            <div>
              <span>WHATSAPP</span>
              <p>+62 812 3456 7890</p>
            </div>

            <div>
              <span>JAM OPERASIONAL</span>
              <p>Setiap hari · 08.00 — 22.00</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <div className="contact-form-header">
            <span>SEND A MESSAGE</span>
            <h3>Hubungi Kami</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="contact-row">
              <div className="contact-group">
                <label>Nama</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="contact-group">
              <label>Pesan</label>

              <textarea
                name="message"
                rows="6"
                placeholder="Tulis pesan Anda..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {success && (
              <div className="contact-message success">{success}</div>
            )}

            {error && <div className="contact-message error">{error}</div>}

            <button type="submit" className="contact-submit" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim Pesan →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
