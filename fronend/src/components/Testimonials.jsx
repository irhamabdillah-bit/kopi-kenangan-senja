import "../styles/Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      name: "Andi Pratama",
      role: "Coffee Enthusiast",
      text: "Kopinya enak dan suasananya nyaman banget. Cocok buat santai sore sambil ngobrol.",
    },
    {
      name: "Nadia Putri",
      role: "Regular Customer",
      text: "Salah satu tempat ngopi favorit saya. Rasanya konsisten dan pelayanannya juga bagus.",
    },
    {
      name: "Rizky Maulana",
      role: "Coffee Lover",
      text: "Signature coffee-nya punya rasa yang unik. Tempatnya juga tenang untuk kerja.",
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header reveal reveal-up">
          <p className="testimonials-subtitle">TESTIMONIALS</p>

          <h2>
            Cerita Dari <strong>Mereka.</strong>
          </h2>

          <p className="testimonials-description">
            Pengalaman sederhana dari pelanggan yang telah menikmati secangkir
            kopi bersama kami.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              className={`testimonial-card reveal ${
                index === 1 ? "featured" : ""
              } ${
                index === 0
                  ? "reveal-left"
                  : index === 1
                    ? "reveal-up"
                    : "reveal-right"
              }`}
              key={testimonial.name}
            >
              <div className="testimonial-top">
                <div className="testimonial-stars">★ ★ ★ ★ ★</div>

                <div className="testimonial-quote">“</div>
              </div>

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h3>{testimonial.name}</h3>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
