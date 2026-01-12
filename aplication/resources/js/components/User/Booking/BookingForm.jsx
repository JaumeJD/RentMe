import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookingForm({ booking = null, onSuccess }) {
  const [form, setForm] = useState({
    vehicle_id: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar vehículos disponibles
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/vehicles")
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));

    if (booking) {
      setForm({
        vehicle_id: booking.vehicle_id,
        fecha_inicio: booking.fecha_inicio,
        fecha_fin: booking.fecha_fin,
      });
    }
  }, [booking]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = booking
      ? `http://localhost:8000/api/v1/user/bookings/${booking.id}`
      : "http://localhost:8000/api/v1/user/bookings";

    try {
      if (booking) {
        await axios.put(url, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post(url, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      onSuccess();
      alert("Reserva guardada correctamente");
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        "Error desconocido al guardar la reserva";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{booking ? "Editar reserva" : "Nueva reserva"}</h3>
      <select name="vehicle_id" value={form.vehicle_id} onChange={handleChange} required>
        <option value="">Selecciona un vehículo</option>
        {vehicles.map(v => (
          <option key={v.id} value={v.id}>
            {v.marca} {v.modelo}
          </option>
        ))}
      </select>

      <input type="date" name="fecha_inicio" value={form.fecha_inicio} onChange={handleChange} required />
      <input type="date" name="fecha_fin" value={form.fecha_fin} onChange={handleChange} required />

      <button disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
    </form>
  );
}
