import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/Vehicle/VehicleCard";

const LandingPage = () => {

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/vehicles")
      .then(res => {
        setVehicles(res.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, []);

  if (loading) return <p>Cargando vehículos...</p>;

  return (
    <>
      <h1>Bienvenido a RentMe</h1>
      <p>Tu plataforma de renting de vehículos</p>

      <div style={{ padding: "2rem" }}>
      <h1>Vehículos disponibles</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1rem"
      }}>
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
    </>
  );
};

export default LandingPage;
