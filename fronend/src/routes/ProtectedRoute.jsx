import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("adminToken");

  console.log("PROTECTED ROUTE TOKEN:", token);

  if (!token) {
    console.log("TOKEN TIDAK ADA -> BALIK LOGIN");
    return <Navigate to="/login" replace />;
  }
  console.log("TOKEN ADA -> MASUK ADMIN");
  return <Outlet />;
}

export default ProtectedRoute;
