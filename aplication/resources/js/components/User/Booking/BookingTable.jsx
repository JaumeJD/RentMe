import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingForm from "./BookingForm"; // Formulario para crear/editar reservas

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [creating, setCreating] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setCreating(false);
  };

  const handleCreate = () => {
    setEditingBooking(null);
    setCreating(true);
  };

  const handleCancel = async (booking) => {
    if (!window.confirm("¿Cancelar esta reserva?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/user/bookings/${booking.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchBookings();
      alert("Reserva cancelada");
    } catch (err) {
      console.error(err);
      alert("No se pudo cancelar la reserva");
    }
  };

  const handleSuccess = () => {
    setCreating(false);
    setEditingBooking(null);
    fetchBookings();
  };

  return (
    <div>
      <h2>Mis Reservas</h2>
      <button onClick={handleCreate}>Nueva Reserva</button>

      {/* Formulario de creación/edición */}
      {creating && <BookingForm onSuccess={handleSuccess} />}
      {editingBooking && <BookingForm booking={editingBooking} onSuccess={handleSuccess} />}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Vehículo</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Matricula</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.vehicle ? `${b.vehicle.marca} ${b.vehicle.modelo}` : "—"}</td>
              <td>{b.fecha_inicio}</td>
              <td>{b.fecha_fin}</td>
              <td>{b.vehicle.matricula}</td>
              <td>{b.estado}</td>
              <td>
                {b.estado !== "cancelada" && (
                  <>
                    <button onClick={() => handleEdit(b)}>Editar</button>
                    <button onClick={() => handleCancel(b)}>Cancelar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
