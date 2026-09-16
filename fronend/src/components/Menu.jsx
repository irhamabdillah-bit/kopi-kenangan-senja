import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";

function Menu() {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
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

        const products = data.data.filter((item) =>
          [1, 2, 4, 5].includes(item.id),
        );

        setMenuItems(products);
      } catch (err) {
        console.error("Error mengambil menu:", err);
        setError("Menu gagal dimuat.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayedItems = showAll ? menuItems : menuItems.slice(0, 2);

  if (loading) {
    return (
      <section className="menu" id="menu">
        <div className="menu-container menu-status">
          <p>Memuat menu...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu" id="menu">
        <div className="menu-container menu-status">
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

          <button
            className="menu-main-button"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Sembunyikan Menu" : "Lihat Semua Menu"}

            <span>{showAll ? "↑" : "→"}</span>
          </button>
        </div>

        {/* MENU LIST */}

        <div className="menu-list" id="menu-list">
          {displayedItems.map((item) => (
            <div className="menu-card" key={item.id}>
              <div className="menu-card-image">
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                />

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
                            image: `http://localhost:5000/uploads/${item.image}`,
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
