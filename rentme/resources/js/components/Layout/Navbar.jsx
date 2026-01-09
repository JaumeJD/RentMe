import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <>
      <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>
        ICONO
      </Link>
      </>

      {!user && (
        <>
        <Link to="/login" style={{ color: "#fff" }}>Login</Link>
        <span style={{ margin: "0 0.5rem" }}>|</span>
        <Link to="/register" style={{ color: "#fff" }}>Register</Link>
        <span style={{ margin: "0 0.5rem" }}>|</span>
        <Link to="/contact" style={{ marginRight: "1rem", color: "#fff" }}>
          Contacto
        </Link>
        </>
      )}

      {user?.role === "client" && (
        <>
        <Link to="/dashboard" style={{ color: "white" }}>{user.name}</Link>
        <span style={{ margin: "0 0.5rem" }}>|</span>
        <Link to="/contact" style={{ marginRight: "1rem", color: "#fff" }}>
          Contacto
        </Link>
        <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      )}

      {user?.role === "admin" && (
        <>
        <Link to="/admin" style={{ color: "white" }}>Admin</Link>
        <span style={{ margin: "0 0.5rem" }}>|</span>
        <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>
          Inicio
        </Link>
        <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
