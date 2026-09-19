import { useEffect, useState } from "react";
import "../../styles/admin/AdminHeader.css";

function AdminHeader() {
  const [admin, setAdmin] = useState();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");

    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <span>ADMIN PANEL</span>
        <h1>Dashboard</h1>
      </div>

      <div className="admin-profile">
        <div className="admin-avatar">
          {admin?.name?.charAt(0).toUpperCase() || "A"}
        </div>

        <div className="admin-profile-info">
          <strong>{admin?.name || "Admin"}</strong>
          <span>{admin?.email || "admin"}</span>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
