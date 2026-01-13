import React , { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Footer = () => {

  const {user} = useContext(AuthContext);
  
  return (
    <footer className="footer flex justify-between items-center">
      {/* Logo / Nombre */}
      <Link to="/">
        <img src="/icono.png" alt="logo" style={{width: 80, height: 80}}/>
      </Link>
      <div>
        <p>{user?<>{user.name}</>:'No has iniciado sesión'}</p>
        <p>© 2025 RentMe – TFG</p>
      </div>
      {/* Links rápidos */}
      <div>
        <div className="flex gap-4 mb-4">
          <Link to="/" className="text-white hover:underline">Inicio</Link>
          <Link to="/contact" className="text-white hover:underline">Contacto</Link>
        </div>
        {/* Copyright */}
        <div className="text-white text-sm">
          &copy; {new Date().getFullYear()} RentMe - Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
