import React from "react";

const VehicleCard = ({ vehicle }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h3>{vehicle.marca} {vehicle.modelo}</h3>
      <p>Precio/día: {vehicle.precio}€</p>
      <button>Reservar</button>
    </div>
  );
};

export default VehicleCard;
