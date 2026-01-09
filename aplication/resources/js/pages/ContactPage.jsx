import React, { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await axios.post("http://localhost:8000/api/v1/contact", form);
      setSuccess("Mensaje enviado correctamente ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Error al enviar mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contacto</h1>
      <p>¿Tienes alguna duda? Escríbenos.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Mensaje"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}
