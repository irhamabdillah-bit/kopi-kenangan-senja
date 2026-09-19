import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/admin/AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <h2>KOPI KENANGAN SENJA</h2>
        <span>SENJA • ADMIN</span>
      </div>

      <nav className="admin-nav">
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
        <NavLink to="/admin/messages">Messages</NavLink>
      </nav>

      <button className="admin-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
