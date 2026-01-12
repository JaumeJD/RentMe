import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingButton from "../components/Booking/BookingButton";

const VehicleDetailPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/vehicles/${id}`)
      .then(res => setVehicle(res.data.data || res.data)) // depende de tu JSON
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando vehículo...</p>;
  if (!vehicle) return <p>Vehículo no encontrado</p>;

  return (
    <div>
      <img src={vehicle.images?.[0]?.image_url} />
      <h1>{vehicle.marca}</h1>
      <h2>{vehicle.modelo}</h2>
      <p>Año: {vehicle.anio}</p>
      <p>Estado: {vehicle.estado}</p>
      <p>Matrícula: {vehicle.matricula}</p>
      <p>Kilometraje: {vehicle.kilometros}</p>
      <p>Precio/día: {vehicle.precio_dia}€</p>
      <p>Precio/mes: {vehicle.precio_mes}€</p>
      <p>Combustible: {vehicle.combustible}</p>
      <p>Transmisión: {vehicle.manual}</p>
      <p>Tipo: {vehicle.tipo}</p>
      <p>Asientos: {vehicle.asientos}</p>
      <p>Observaciones: {vehicle.observaciones}</p>
      {/* ...otros detalles */}
      <BookingButton vehicleId={vehicle.id} />
    </div>
  );
};

export default VehicleDetailPage;
