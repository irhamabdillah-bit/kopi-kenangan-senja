import "../styles/Menu.css";

import latteImage from "../assets/latte.png";
import americanoImage from "../assets/americano.png";
import caramelImage from "../assets/caramel.png";
import matchaImage from "../assets/matcha.png";

const menuItems = [
  {
    name: "Creamy Latte",
    description: "Perpaduan espresso dan susu creamy dengan rasa yang lembut.",
    price: "Rp25.000",
    image: latteImage,
  },
  {
    name: "Iced Americano",
    description:
      "Kopi hitam dengan rasa bold dan segar, cocok untuk segala suasana.",
    price: "Rp20.000",
    image: americanoImage,
  },
  {
    name: "Caramel Macchiato",
    description:
      "Kombinasi espresso, susu, dan sentuhan caramel yang menggoda.",
    price: "Rp28.000",
    image: caramelImage,
  },
  {
    name: "Matcha Latte",
    description: "Matcha premium dengan tekstur lembut dan rasa yang creamy.",
    price: "Rp26.000",
    image: matchaImage,
  },
];

function Menu() {
  return (
    <section className="menu" id="menu">
      <div className="menu-overlay"></div>

      <div className="menu-container">
        <div className="menu-intro">
          <div className="menu-label">
            <span></span>
            OUR MENU
          </div>

          <h2>
            Menu Spesial
            <br />
            <strong>Untuk Anda</strong>
          </h2>

          <p>
            Kami menyajikan berbagai pilihan kopi terbaik dengan cita rasa yang
            khas dan kualitas premium. Setiap cangkir dibuat dengan penuh
            perhatian.
          </p>

          <a href="#menu-list" className="menu-main-button">
            Lihat Semua Menu <span>→</span>
          </a>
        </div>

        <div className="menu-list" id="menu-list">
          {menuItems.map((item, index) => (
            <div className="menu-card" key={index}>
              <div className="menu-card-image">
                <img src={item.image} alt={item.name} />

                <span className="menu-category">COFFEE</span>
              </div>

              <div className="menu-card-content">
                <h3>{item.name}</h3>

                <p>{item.description}</p>

                <div className="menu-card-line"></div>

                <div className="menu-card-bottom">
                  <span className="menu-price">{item.price}</span>

                  <button className="menu-order-button">Pesan</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
