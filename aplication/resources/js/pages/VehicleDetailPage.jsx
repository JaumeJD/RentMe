import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VehicleDetailPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/vehicles/${id}`)
      .then(res => setVehicle(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando vehículo...</p>;
  if (!vehicle) return <p>Vehículo no encontrado</p>;
  
  const images = vehicle.images || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const calculatePrice = (start, end) => {
    if (!start || !end) return 0;
    const diffTime = new Date(end) - new Date(start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * vehicle.precio_dia;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Selecciona fecha inicio y fecha fin");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("La fecha de inicio no puede ser posterior a la de fin");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/bookings",
        {
          vehicle_id: vehicle.id,
          fecha_inicio: startDate,
          fecha_fin: endDate,
          precio_total: totalPrice
        },
        { headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        } }
      );
      alert("Reserva creada correctamente!");
      setStartDate("");
      setEndDate("");
      setTotalPrice(0);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Error al crear la reserva. Revisa fechas y disponibilidad."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Carrusel */}
      <div style={{ position: "relative", width: "40%", height: "400px", overflow: "hidden", borderRadius: "8px" }}>
        {images.length > 0 ? (
          <img
            src={`http://localhost:8000/${images[currentIndex].image_url}`}
            alt={`Imagen ${currentIndex + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            No hay imágenes
          </div>
        )}

        {/* Botones superpuestos */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              &#8249;
            </button>

            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              &#8250;
            </button>
          </>
        )}
      </div>
      <h2>{vehicle.marca} {vehicle.modelo}</h2>
      <p>Año: {vehicle.anio}</p>
      <p>Estado: {vehicle.estado}</p>
      <p>Matrícula: {vehicle.matricula}</p>
      <p>Kilometraje: {vehicle.kilometros}</p>
      <p>Precio/día: {vehicle.precio_dia}€</p>
      <p>Precio/mes: {vehicle.precio_mes}€</p>
      <p>Combustible: {vehicle.combustible}</p>
      <p>Transmisión: {vehicle.transmision}</p>
      <p>Tipo: {vehicle.tipo}</p>
      <p>Asientos: {vehicle.asientos}</p>
      <p>Observaciones: {vehicle.observaciones}</p>

      <form
        onSubmit={handleBooking}
        className="mt-6 p-4 border rounded flex flex-col gap-3 max-w-sm"
      >
        <h2 className="text-lg font-semibold">Alquilar este vehículo</h2>

        <label>
          Fecha inicio:
          <input
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setStartDate(e.target.value);
              setTotalPrice(calculatePrice(e.target.value, endDate));
            }}
            required
            className="border p-1 rounded w-full"
          />
        </label>

        <label>
          Fecha fin:
          <input
            type="date"
            value={endDate}
            min={startDate || new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setEndDate(e.target.value);
              setTotalPrice(calculatePrice(startDate, e.target.value));
            }}
            required
            className="border p-1 rounded w-full"
          />
        </label>

        <p className="font-semibold">Precio total: {totalPrice}€</p>

        <button
          type="submit"
          disabled={submitting}
          className="button"
        >
          {submitting ? "Reservando..." : "Confirmar reserva"}
        </button>
      </form>
    </div>
  );
};

export default VehicleDetailPage;
