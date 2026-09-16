import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const quantity = location.state?.quantity;
  const orderId = location.state?.orderId;
  const totalPrice = location.state?.totalPrice;

  const formattedTotal = totalPrice
    ? `Rp${Number(totalPrice).toLocaleString("id-ID")}`
    : "-";

  return (
    <section className="order-success">
      <div className="success-container">
        <div className="success-icon">✓</div>

        <p className="success-label">ORDER CONFIRMED</p>

        <h1>Terima Kasih.</h1>

        <p className="success-description">
          Pesanan kamu berhasil diterima.
          <br />
          Kami akan segera memproses pesanan kamu.
        </p>

        <div className="success-order-info">
          <span>DETAIL PESANAN</span>

          {product && <h3>{product}</h3>}

          <div className="success-detail-row">
            <p>Jumlah</p>

            <strong>{quantity || "-"}</strong>
          </div>

          <div className="success-detail-row">
            <p>Order ID</p>

            <strong>#{orderId || "-"}</strong>
          </div>

          <div className="success-detail-row total">
            <p>Total</p>

            <strong>{formattedTotal}</strong>
          </div>
        </div>

        <div className="success-actions">
          <button
            className="success-button primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Kembali ke Home
          </button>

          <button
            className="success-button secondary"
            onClick={() => {
              navigate("/", {
                state: {
                  scrollTo: "menu",
                },
              });
            }}
          >
            Lihat Menu Lagi
          </button>
        </div>

        <div className="success-brand">KOPI KENANGAN SENJA</div>
      </div>
    </section>
  );
}

export default OrderSuccess;
