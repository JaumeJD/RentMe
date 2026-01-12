import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ role, children }) {
  
  const { user, loading, isAuthenticated } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!isAuthenticated) return <Navigate to="/login" />;
  
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}
