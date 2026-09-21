import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/admin/AdminOrders.css";
import API_URL from "../../config/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data pesanan.");
      }

      setOrders(result.data || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengubah status pesanan.");
      }

      alert("Status pesanan berhasil diperbarui.");

      fetchOrders();
    } catch (error) {
      console.error("Update order status error:", error);
      alert(error.message);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader />

        <section className="admin-content">
          <div className="orders-header">
            <div>
              <span>ORDER MANAGEMENT</span>
              <h2>Pesanan Pelanggan</h2>
              <p>Kelola dan pantau semua pesanan yang masuk.</p>
            </div>
          </div>

          {loading ? (
            <div className="orders-loading">Memuat pesanan...</div>
          ) : orders.length === 0 ? (
            <div className="orders-empty">
              <h3>Belum ada pesanan</h3>
              <p>Pesanan dari pelanggan akan muncul di sini.</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-card-header">
                    <div>
                      <span className="order-number">ORDER #{order.id}</span>

                      <h3>{order.costumer_name}</h3>
                    </div>

                    <span className={`order-status status-${order.status}`}>
                      {order.status === "cencelled"
                        ? "Cancelled"
                        : order.status}
                    </span>
                  </div>

                  <div className="order-info">
                    <div>
                      <span>No. Telepon</span>
                      <strong>{order.costumer_phone}</strong>
                    </div>

                    <div>
                      <span>Alamat</span>
                      <strong>{order.costumer_address}</strong>
                    </div>

                    <div>
                      <span>Total</span>
                      <strong>{formatPrice(order.total_price)}</strong>
                    </div>
                  </div>

                  <div className="order-items">
                    <h4>Detail Pesanan</h4>

                    {order.items.map((item) => (
                      <div className="order-item" key={item.id}>
                        <div className="order-item-image">
                          {item.product_image ? (
                            <img
                              src={`${API_URL}/uploads/${item.product_image}`}
                              alt={item.product_name}
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </div>

                        <div className="order-item-info">
                          <strong>{item.product_name}</strong>

                          <span>
                            {item.quantity} × {formatPrice(item.price)}
                          </span>
                        </div>

                        <strong>
                          {formatPrice(item.quantity * item.price)}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="order-actions">
                    <label htmlFor={`status-${order.id}`}>Ubah Status</label>

                    <select
                      id={`status-${order.id}`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>

                      <option value="processing">Processing</option>

                      <option value="completed">Completed</option>

                      <option value="cencelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminOrders;
