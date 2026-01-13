import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookingForm({ booking = null, onSaved }) {

  const [form, setForm] = useState({
    user_id: "",
    vehicle_id: "",
    fecha_inicio: "",
    fecha_fin: "",
    estado: "confirmada",
  });

  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // 👉 Cargar usuarios y vehículos
  useEffect(() => {
    fetchUsers();
    fetchVehicles();
  }, []);

  // 👉 Si estamos editando, rellenar formulario
  useEffect(() => {
    if (booking) {
      setForm({
        user_id: booking.user_id,
        vehicle_id: booking.vehicle_id,
        fecha_inicio: booking.fecha_inicio,
        fecha_fin: booking.fecha_fin,
        estado: booking.estado,
      });
    }
  }, [booking]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const fetchVehicles = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/admin/vehicles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVehicles(res.data);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/admin/vehicles", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setVehicles(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (booking) {
        await axios.put(
          `http://localhost:8000/api/v1/admin/bookings/${booking.id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/v1/admin/bookings",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      onSaved?.();   // Actualiza la tabla
      alert("Reserva guardada correctamente");

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
      <h3>{booking ? "Editar reserva" : "Nueva reserva"}</h3>
      {error && <p className="error">{error}</p>}

      {/* Usuario */}
      <select name="user_id" value={form.user_id} onChange={handleChange} required>
        <option value="">Seleccionar usuario</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      {/* Vehículo */}
      <select name="vehicle_id" value={form.vehicle_id} onChange={handleChange}>
        <option value="">Selecciona un vehículo</option>
        {vehicles.map(v => (
          <option key={v.id} value={v.id}>
            {v.marca} {v.modelo}
          </option>
        ))}
      </select>

      {/* Fechas */}
      <input
        type="date"
        name="fecha_inicio"
        value={form.fecha_inicio}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="fecha_fin"
        value={form.fecha_fin}
        onChange={handleChange}
        required
      />

      {/* Estado */}
      <select name="estado" value={form.estado} onChange={handleChange}>
        <option value="pendiente">Pendiente</option>
        <option value="confirmada">Confirmada</option>
        <option value="activa">Activa</option>
        <option value="finalizada">Finalizada</option>
        <option value="cancelada">Cancelada</option>
      </select>

      <br />

      <button disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
