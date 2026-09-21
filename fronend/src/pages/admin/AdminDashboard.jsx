import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/admin/AdminDashboard.css";
import { useEffect, useState } from "react";
import API_URL from "../../config/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalMessages: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockProducts: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data dashboard.");
      }

      setStats(result.data);
    } catch (error) {
      console.error("Dashboard stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader />

        <section className="admin-content">
          <div className="dashboard-intro">
            <span>OVERVIEW</span>
            <h2>Selamat Datang di Admin Dashboard</h2>
            <p>Kelola produk, pesanan, dan pesan pelanggan dari satu tempat.</p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <span>Total Produk</span>

              <strong>{loading ? "..." : stats.totalProducts}</strong>

              <small>Semua produk</small>
            </div>

            <div className="stat-card">
              <span>Total Pesanan</span>

              <strong>{loading ? "..." : stats.totalOrders}</strong>

              <small>Semua pesanan</small>
            </div>

            <div className="stat-card">
              <span>Pesan Masuk</span>

              <strong>{loading ? "..." : stats.totalMessages}</strong>

              <small>Pesan pelanggan</small>
            </div>

            <div className="stat-card">
              <span>Total Pendapatan</span>

              <strong>
                {loading
                  ? "..."
                  : new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(stats.totalRevenue)}
              </strong>

              <small>Pendapatan pesanan</small>
            </div>
          </div>

          <div className="dashboard-sections">
            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <span>ORDERS</span>
                  <h3>Pesanan Terbaru</h3>
                </div>
              </div>

              <div className="recent-orders">
                {loading ? (
                  <p>Memuat pesanan...</p>
                ) : (stats.recentOrders || []).length === 0 ? (
                  <p>Belum ada pesanan.</p>
                ) : (
                  stats.recentOrders.map((order) => (
                    <div className="recent-order-item" key={order.id}>
                      <div>
                        <strong>#{order.id}</strong>
                        <span>{order.costumer_name}</span>
                      </div>

                      <div>
                        <strong>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(order.total_price)}
                        </strong>

                        <span className={`order-status ${order.status}`}>
                          {order.status === "cencelled"
                            ? "Cancelled"
                            : order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <span>STOCK</span>
                  <h3>Stok Menipis</h3>
                </div>
              </div>

              <div className="low-stock-list">
                {loading ? (
                  <p>Memuat stok...</p>
                ) : (stats.lowStockProducts || []).length === 0 ? (
                  <p>Semua stok masih aman.</p>
                ) : (
                  stats.lowStockProducts.map((product) => (
                    <div className="low-stock-item" key={product.id}>
                      <div>
                        <strong>{product.name}</strong>
                        <span>Stok tersisa</span>
                      </div>

                      <strong className="stock-number">{product.stock}</strong>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
