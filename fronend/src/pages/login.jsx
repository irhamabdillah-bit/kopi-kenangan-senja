import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import API_URL from "../config/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login gagal.");
      }

      localStorage.setItem("adminToken", data.data.token);
      localStorage.setItem("adminData", JSON.stringify(data.data.admin));

      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <p>KOPI KENANGAN SENJA</p>
          <span>ADMIN PANEL</span>
        </div>

        <div className="login-card">
          <div className="login-header">
            <span>WELCOME BACK</span>
            <h1>Login Admin</h1>
            <p>Masuk untuk mengelola website Kopi Kenangan Senja.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukan email admin"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Memproses..." : "Masuk ke Dashboard ->"}
            </button>
          </form>
        </div>

        <button className="back-home" onClick={() => navigate("/")}>
          ← Kembali ke Website
        </button>
      </div>
    </section>
  );
}

export default Login;
