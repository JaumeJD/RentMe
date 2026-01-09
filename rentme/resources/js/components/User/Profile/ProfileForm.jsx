import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileForm({ user, onSuccess }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  
  const [loading, setLoading] = useState(false);

  // Actualiza el formulario cuando cambia el usuario
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "", // siempre vacío
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("http://localhost:8000/api/v1/user/profile", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onSuccess();
      alert("Perfil actualizado");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name ?? ""}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="email"
        value={form.email ?? ""}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="phone"
        value={form.phone ?? ""}
        onChange={handleChange}
        placeholder="Teléfono"
      />
      <input
        type="password"
        name="password"
        value={form.password ?? ""}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      <button disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

