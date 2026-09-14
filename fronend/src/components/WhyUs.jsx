import "../styles/WhyUs.css";
import coffeeImage from "../assets/hero-coffee.png";

const features = [
  {
    number: "01",
    icon: "✦",
    title: "Kopi Premium",
    description:
      "Menggunakan biji kopi pilihan dengan kualitas terbaik untuk menghasilkan cita rasa yang konsisten.",
  },
  {
    number: "02",
    icon: "◌",
    title: "Bahan Berkualitas",
    description:
      "Setiap bahan dipilih dengan teliti agar rasa dan kualitas tetap terjaga di setiap sajian.",
  },
  {
    number: "03",
    icon: "♡",
    title: "Rasa Autentik",
    description:
      "Racikan khas yang dibuat untuk memberikan karakter rasa yang unik dan berkesan.",
  },
  {
    number: "04",
    icon: "★",
    title: "Pelayanan Ramah",
    description:
      "Kami memberikan pelayanan yang nyaman dan ramah agar setiap kunjungan terasa menyenangkan.",
  },
  {
    number: "05",
    icon: "⌂",
    title: "Suasana Nyaman",
    description:
      "Tempat yang tenang dan hangat untuk menikmati kopi, bekerja, atau berbincang bersama.",
  },
  {
    number: "06",
    icon: "◆",
    title: "Harga Bersahabat",
    description:
      "Menikmati kopi berkualitas dengan harga yang tetap terjangkau untuk berbagai kalangan.",
  },
];

function WhyUs() {
  return (
    <section className="why-us" id="why-us">
      <img
        className="why-background"
        src={coffeeImage}
        alt="Kopi Kenangan Senja"
      />

      <div className="why-overlay"></div>

      <div className="why-container">
        {/* HEADER */}
        <div className="why-header reveal reveal-up">
          <div className="why-label">
            <span></span>
            WHY CHOOSE US
          </div>

          <h2>
            Lebih Dari Sekadar
            <br />
            <strong>Secangkir Kopi.</strong>
          </h2>

          <p>
            Kami percaya bahwa kopi yang baik bukan hanya tentang rasa, tetapi
            juga tentang kualitas, kenyamanan, dan pengalaman yang diberikan.
          </p>
        </div>

        {/* FEATURES */}
        <div className="why-features">
          {features.map((feature, index) => (
            <div
              className={`why-feature reveal ${
                index % 2 === 0 ? "reveal-left" : "reveal-right"
              }`}
              key={feature.number}
            >
              <div className="why-feature-top">
                <span className="why-number">{feature.number}</span>

                <div className="why-icon">{feature.icon}</div>
              </div>

              <div className="why-feature-content">
                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>

              <div className="why-feature-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
