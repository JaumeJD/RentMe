import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/v1/user/booking', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(res.data); // Ajusta según tu API: si viene en res.data.data, cambia
      } catch (err) {
        console.error(err);
        setError('Error al cargar las reservas');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!bookings.length) return <p>No tienes reservas.</p>;

  return (
    <div>
      <h2>Mis Reservas</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>Vehículo:</strong> {booking.vehicle_name || booking.vehicle?.name} <br />
            <strong>Fecha inicio:</strong> {booking.start_date} <br />
            <strong>Fecha fin:</strong> {booking.end_date} <br />
            <strong>Estado:</strong> {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
