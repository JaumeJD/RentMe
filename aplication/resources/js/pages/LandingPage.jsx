import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/Vehicle/VehicleCard";

const LandingPage = () => {

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    marca: "",
    combustible: "",
    tipo: "",
    transmision: "",
    precio_dia: "",
    precio_mes: ""
  })

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/vehicles")
      .then(res => {
        setVehicles(res.data || [])
        setFilteredVehicles(res.data || [])
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, []);

  useEffect(()=> {
    let temp = [...vehicles];

    if (filters.marca) {
      temp = temp.filter(v => v.marca.toLowerCase() === filters.marca.toLowerCase());
    }
    if (filters.combustible) {
      temp = temp.filter(v => v.combustible.toLowerCase() === filters.combustible.toLowerCase());
    }
    if (filters.tipo) {
      temp = temp.filter(v => v.tipo.toLowerCase() === filters.tipo.toLowerCase());
    }
    if (filters.transmision) {
      temp = temp.filter(v => v.transmision.toLowerCase() === filters.transmision.toLowerCase());
    }

    if (filters.precio === "asc") {
      temp.sort((a, b) => a.precio_dia - b.precio_dia);
    } else if (filters.precio === "desc") {
      temp.sort((a, b) => b.precio_dia - a.precio_dia);
    }

    setFilteredVehicles(temp);
  }, [filters, vehicles]);

  const handleFilterChange = (e) => {
    const {name, value} = e.target
    setFilters(prev => ({...prev, [name]: value}))
  }

  if (loading) return <p>Cargando vehículos...</p>;

  return (
    <>
      <h1>Bienvenido a RentMe</h1>
      <p>Tu plataforma de renting de vehículos</p>

      <div style={{ padding: "2rem" }}>
        <h2>Filtros</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <select name="marca" value={filters.marca} onChange={handleFilterChange}>
            <option value="">Todas las marcas</option>
            {[...new Set((vehicles || []).map(v => v.marca))].map(m => (
            <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select name="combustible" value={filters.combustible} onChange={handleFilterChange}>
            <option value="">Todos los combustibles</option>
            {[...new Set((vehicles || []).map(v => v.combustible))].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select name="tipo" value={filters.tipo} onChange={handleFilterChange}>
            <option value="">Todos los tipos</option>
            {[...new Set((vehicles || []).map(v => v.tipo))].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select name="transmision" value={filters.transmision} onChange={handleFilterChange}>
            <option value="">Todas las transmisiones</option>
            {[...new Set((vehicles || []).map(v => v.transmision))].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select name="precio" value={filters.precio} onChange={handleFilterChange}>
            <option value="">Ordenar por precio</option>
            <option value="asc">Precio ascendente</option>
            <option value="desc">Precio descendente</option>
          </select>
        </div>

        <h2>Vehículos disponibles</h2>
        {filteredVehicles.length === 0 ? (
          <p>No hay vehículos con esos filtros.</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem"
          }}>
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LandingPage;
