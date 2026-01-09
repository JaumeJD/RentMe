import React , { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";

const BookingTable = () => {

  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [creating, setCreating] = useState(false);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {

    const res = await axios.get(
      "http://localhost:8000/api/v1/admin/bookings",
      { headers: { Authorization: `Bearer ${token}` }}
    );
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEdit = (booking) => {

    setEditingBooking(booking);
    setCreating(false);
    fetchBookings();
  };

  const handleCreate = () => {

    setEditingBooking(null);
    setCreating(true);
    fetchBookings();
  };

  const handleDelete = async (id) => {

    if (!window.confirm("¿Eliminar reserva?")) return;

    await axios.delete(`http://localhost:8000/api/v1/admin/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchBookings();
  };

  const handleSaved = () => {

    setCreating(false);
    setEditingBooking(null);
    fetchBookings();
  };

  return (
    <div>
      <button onClick={handleCreate}>Nueva Reserva</button>

      {creating && <BookingForm onSaved={handleSaved} />}
      {editingBooking && (
        <BookingForm booking={editingBooking} onSaved={handleSaved} />
      )}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Vehículo</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user?.name || "N/A"}</td>
              <td>{b.vehicle ? `${b.vehicle.marca} ${b.vehicle.modelo}` : "N/A"}</td>
              <td>{b.fecha_inicio}</td>
              <td>{b.fecha_fin}</td>
              <td>{b.estado}</td>
              <td>
                <button onClick={() => handleEdit(b)}>Editar</button>
                <button onClick={() => handleDelete(b.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;