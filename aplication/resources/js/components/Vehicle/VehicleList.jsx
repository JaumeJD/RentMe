import React from "react";
import VehicleCard from './VehicleCard';

export default function VehicleList({ vehicles }) {
  if (!vehicles || vehicles.length === 0) {
    return <p>No hay vehículos disponibles.</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
