import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserForm({ user = null }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    role: "client", 
    password: "" 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    if (user) setForm({ ...user, password: "" }); 
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = user
      ? `http://localhost:8000/api/v1/admin/users/${user.id}`
      : "http://localhost:8000/api/v1/admin/users";

    try {
      if (user) {
        await axios.put(url, form, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      } else {
        await axios.post(url, form, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      }
      fetchUsers();
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Error al guardar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <select name="role" value={form.role} onChange={handleChange} required>
        <option value="client">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
      <button disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
    </form>
  );
}
