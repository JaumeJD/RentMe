import React , { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {

  const {user} = useContext(AuthContext);

  return (
    <footer style={{ padding: "1rem", textAlign: "center" }}>
      <p>© 2025 RentMe – TFG</p>
      <p>{user?<>Bienvenido, {user.name}!</>:'No has iniciado sesión'}</p>
    </footer>
  );
};

export default Footer;
