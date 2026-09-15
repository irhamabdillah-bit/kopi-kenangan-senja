import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";

import latteImage from "../assets/latte.png";
import americanoImage from "../assets/americano.png";
import caramelImage from "../assets/caramel.png";
import matchaImage from "../assets/matcha.png";

const menuImages = {
  1: latteImage,
  2: caramelImage,
  4: americanoImage,
  5: matchaImage,
};

function Menu() {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data menu.");
        }

        setMenuItems(data.data);

        setMenuItems(
          data.data.filter((item) => [1, 2, 4, 5].includes(item.id)),
        );
      } catch (err) {
        console.error("Error mengambil menu:", err);
        setError("Menu gagal dimuat.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="menu" id="menu">
        <div className="menu-container">
          <p>Memuat menu...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu" id="menu">
        <div className="menu-container">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="menu" id="menu">
      <div className="menu-overlay"></div>

      <div className="menu-container">
        {/* INTRO */}
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

        {/* MENU LIST */}
        <div className="menu-list" id="menu-list">
          {menuItems.map((item) => (
            <div className="menu-card" key={item.id}>
              <div className="menu-card-image">
                <img src={menuImages[item.id]} alt={item.name} />

                <span className="menu-category">
                  {item.category_name || "COFFEE"}
                </span>
              </div>

              <div className="menu-card-content">
                <h3>{item.name}</h3>

                <p>{item.description}</p>

                <div className="menu-card-line"></div>

                <div className="menu-card-bottom">
                  <span className="menu-price">
                    Rp
                    {Number(item.price).toLocaleString("id-ID")}
                  </span>

                  <button
                    className="menu-button"
                    onClick={() =>
                      navigate("/order", {
                        state: {
                          product: {
                            ...item,
                            image: menuImages[item.id],
                          },
                        },
                      })
                    }
                  >
                    Pesan
                  </button>
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
