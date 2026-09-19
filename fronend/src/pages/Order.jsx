import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Order.css";
import API_URL from "../config/api";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <section className="order-page">
        <div className="order-error">
          <h2>Produk tidak ditemukan.</h2>

          <button onClick={() => navigate("/")}>Kembali ke Menu</button>
        </div>
      </section>
    );
  }

  const quantity = Number(formData.quantity);
  const price = Number(product.price);
  const stock = Number(product.stock);

  const totalPrice = price * quantity;

  const formattedPrice = `Rp${price.toLocaleString("id-ID")}`;
  const formattedTotal = `Rp${totalPrice.toLocaleString("id-ID")}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity < 1) {
      alert("Jumlah pesanan minimal 1.");
      return;
    }

    if (quantity > stock) {
      alert(`Stok tersedia hanya ${stock} produk.`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: formData.address,

          items: [
            {
              product_id: product.id,
              quantity: quantity,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal membuat pesanan.");
      }

      navigate("/order-success", {
        state: {
          orderId: data.data.order_id,
          product: product.name,
          quantity: quantity,
          totalPrice: data.data.total_price,
        },
      });
    } catch (error) {
      console.error("Order error:", error);

      alert(error.message || "Terjadi kesalahan saat membuat pesanan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="order-page">
      <div className="order-container">
        <button
          className="back-button"
          onClick={() => {
            navigate("/", {
              state: {
                scrollTo: "menu",
              },
            });
          }}
        >
          ← Kembali
        </button>

        <div className="order-grid">
          {/* PRODUK */}

          <div className="order-product">
            <div className="order-image-wrapper">
              <img src={product.image} alt={product.name} />
            </div>

            <p className="order-label">PESANAN ANDA</p>

            <h1>{product.name}</h1>

            <p className="order-description">{product.description}</p>

            <div className="order-price">{formattedPrice}</div>

            <div className="order-stock">
              Stok tersedia: <strong>{stock}</strong>
            </div>
          </div>

          {/* FORM */}

          <div className="order-form-wrapper">
            <div className="order-form-header">
              <p>ORDER FORM</p>

              <h2>Lengkapi Pesanan</h2>

              <span>Isi data di bawah untuk melanjutkan pesanan.</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="order-form-group">
                <label>Nama</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="order-form-group">
                <label>Nomor WhatsApp</label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Contoh: 08123456789"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="order-form-group">
                <label>Alamat</label>

                <textarea
                  name="address"
                  rows="3"
                  placeholder="Masukkan alamat lengkap"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="order-form-group">
                <label>Jumlah Pesanan</label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max={stock}
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* TOTAL */}

              <div className="order-total">
                <span>Total Pesanan</span>

                <strong>{formattedTotal}</strong>
              </div>

              <button
                type="submit"
                className="order-submit-button"
                disabled={loading || stock <= 0}
              >
                {stock <= 0
                  ? "Stok Habis"
                  : loading
                    ? "Memproses..."
                    : "Buat Pesanan →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Order;
