import "../styles/WhyUs.css";
import coffeeImage from "../assets/hero-coffee.png";

const features = [
  {
    icon: "✦",
    title: "Kopi Premium",
    description: "Menggunakan biji kopi pilihan dengan kualitas terbaik.",
  },
  {
    icon: "◌",
    title: "Bahan Alami",
    description: "Tanpa bahan pengawet dan pewarna buatan.",
  },
  {
    icon: "♥",
    title: "Rasa Autentik",
    description: "Racikan khas yang memiliki karakter dan cita rasa.",
  },
  {
    icon: "★",
    title: "Pelayanan Ramah",
    description: "Kami selalu siap memberikan pengalaman terbaik.",
  },
  {
    icon: "⌂",
    title: "Suasana Nyaman",
    description: "Tempat yang pas untuk bersantai dan berbincang.",
  },
  {
    icon: "◆",
    title: "Harga Terjangkau",
    description: "Kualitas terbaik dengan harga yang bersahabat.",
  },
];

function WhyUs() {
  return (
    <section className="why-us" id="why-us">
      {/* BACKGROUND */}

      <img
        className="why-background"
        src={coffeeImage}
        alt="Kopi Kenangan Senja"
      />

      <div className="why-overlay"></div>

      {/* CONTENT */}

      <div className="why-container">
        {/* LEFT */}

        <div className="why-intro">
          <div className="why-label">
            <span></span>
            WHY CHOOSE US
          </div>

          <h2>
            Kenapa Memilih
            <br />
            <strong>Kopi Kenangan Senja?</strong>
          </h2>

          <p>
            Kami bukan hanya sekadar kedai kopi, tapi tempat untuk merasakan
            ketenangan, kehangatan, dan kenangan dalam setiap tegukan.
          </p>
        </div>

        {/* FEATURES */}

        <div className="why-features">
          {features.map((feature, index) => (
            <div className="why-feature" key={index}>
              <div className="why-icon">{feature.icon}</div>

              <div className="why-feature-content">
                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
