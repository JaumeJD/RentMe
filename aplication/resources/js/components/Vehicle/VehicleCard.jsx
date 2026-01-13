import React from "react";
import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  return (
    <Link to={`/vehicles/${vehicle.id}`}>
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px"
    }}>
    <img
      src={vehicle.images[0]?.image_url}
      alt={vehicle.name}
      style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{vehicle.marca}</h3>
      <h4>{vehicle.modelo}</h4>
      <p>Precio/día: {vehicle.precio_dia}€</p>
      <p>Precio/mes: {vehicle.precio_mes}€</p>
    </div>
      </Link>
  );
};

export default VehicleCard;
