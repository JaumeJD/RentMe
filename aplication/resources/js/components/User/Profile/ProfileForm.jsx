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
  const [error, setError] = useState(null);

  // Actualiza el formulario cuando cambia el usuario
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Crear payload solo con lo necesario
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    // Solo incluir contraseña si el usuario ingresó algo
    if (form.password) {
      payload.password = form.password;
    }

    try {
      const res = await axios.put("http://localhost:8000/api/v1/user/profile", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Perfil actualizado");
      onSuccess(res.data);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        "Error desconocido al guardar la reserva";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar perfil</h3>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Teléfono"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Nueva contraseña (opcional)"
      />
      {error && <p className="error">{error}</p>}
      <button disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
