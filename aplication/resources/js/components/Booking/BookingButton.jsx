import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const BookingButton = ({ vehicleId }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRent = () => {
    if (!isAuthenticated) {
      // No está logueado como cliente → ir a login
      navigate("/login");
      return;
    }

    // Aquí va la lógica para alquilar el vehículo
    // Por ejemplo: abrir un modal, llamar a la API, etc.
    alert(`Vas a alquilar el vehículo ${vehicleId}`);
  };

  return (
    <button
      onClick={handleRent}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Alquilar
    </button>
  );
};

export default BookingButton;
