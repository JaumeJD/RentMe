import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      // Hacemos POST a la ruta de login
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email,
        password
      });

      // res.data ya contiene la respuesta JSON
      // Actualizamos contexto con el usuario y token
      login(res.data.user, res.data.access_token);

      // Redirigimos según rol
      navigate(res.data.user.role === "admin" ? "/admin" : "/dashboard");

    } catch (err) {
      // Axios lanza automáticamente error si status != 2xx
      // Podemos acceder al mensaje del backend
      setError(err.response?.data?.message || "Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
