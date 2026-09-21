import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/admin/AdminMessages.css";
import API_URL from "../../config/api";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil pesan.");
      }

      setMessages(result.data || []);
    } catch (error) {
      console.error("Fetch messages error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (message) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus pesan dari "${message.name}"?`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/admin/messages/${message.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus pesan.");
      }

      alert("Pesan berhasil dihapus.");

      fetchMessages();
    } catch (error) {
      console.error("Delete message error:", error);
      alert(error.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader />

        <section className="admin-content">
          <div className="messages-header">
            <span>CUSTOMER MESSAGES</span>

            <h2>Pesan Pelanggan</h2>

            <p>Lihat dan kelola pesan yang dikirim pelanggan.</p>
          </div>

          {loading ? (
            <div className="messages-loading">Memuat pesan...</div>
          ) : messages.length === 0 ? (
            <div className="messages-empty">
              <h3>Belum ada pesan</h3>

              <p>Pesan dari pelanggan akan muncul di sini.</p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <article className="message-card" key={message.id}>
                  <div className="message-top">
                    <div className="message-avatar">
                      {message.name?.charAt(0).toUpperCase() || "?"}
                    </div>

                    <div className="message-sender">
                      <h3>{message.name}</h3>

                      <span>{message.email}</span>
                    </div>

                    <time>{formatDate(message.created_at)}</time>
                  </div>

                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>

                  <div className="message-actions">
                    <a
                      href={`mailto:${message.email}`}
                      className="reply-button"
                    >
                      Balas Email
                    </a>

                    <button
                      className="delete-message-button"
                      onClick={() => handleDelete(message)}
                    >
                      Hapus
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminMessages;
