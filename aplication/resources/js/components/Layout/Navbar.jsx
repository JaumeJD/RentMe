import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>
        RentMe
      </Link>

      {!user && (
        <Link to="/login" style={{ color: "#fff" }}>
          Login
        </Link>
      )}

      {user?.role === "user" && (
        <Link to="/dashboard" style={{ color: "#fff" }}>
          Mi Panel
        </Link>
      )}

      {user?.role === "admin" && (
        <Link to="/admin" style={{ color: "#fff" }}>
          Admin
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
