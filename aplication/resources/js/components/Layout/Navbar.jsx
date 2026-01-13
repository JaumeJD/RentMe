import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src="/icono.png" alt="logo" style={{width: 80, height: 80}}/>
        </Link>
      </div>

      {/* Menú cuando no hay usuario */}
      {!user && (
        <div className="flex gap-4 items-center">
          <Link to="/">Inicio</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/contact">Contacto</Link>
        </div>
      )}

      {/* Menú cliente */}
      {user?.role === "client" && (
        <div className="flex gap-4 items-center">
          <Link to="/">Inicio</Link>
          <Link to="/dashboard">{user.name}</Link>
          <Link to="/contact">Contacto</Link>
          <button className="btn-primary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}

      {/* Menú admin */}
      {user?.role === "admin" && (
        <div className="flex gap-4 items-center">
          <Link to="/">Inicio</Link>
          <Link to="/admin">{user.name}</Link>
          <Link to="/contact">Contacto</Link>
          <button className="btn-primary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
