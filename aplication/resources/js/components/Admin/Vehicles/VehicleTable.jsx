import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import VehicleForm from "./VehicleForm";

const VehicleTable = () => {

  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [creatingVehicle, setCreatingVehicle] = useState(false);
  const [error, setError] = useState(null);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/admin/vehicles", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setCreatingVehicle(false);
    fetchVehicles();
  }

  const handleCreate = () => {
    setCreatingVehicle(true);
    setEditingVehicle(null);
    fetchVehicles();
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar vehículo?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchVehicles();
    } catch (err) {
      console.error(err);
      
      const message =
      err.response?.data?.message ||
      Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
      "Error en los datos del usuario.";

      setError(message)
    }
    fetchVehicles();
  };

  return (
    <div>
      <h2>Vehículos</h2>

      <button onClick={handleCreate}>Nuevo Vehículo</button>
      {error && <p className="error">{error}</p>}
      {/* Mostrar formulario solo si estamos creando o editando */}
      {(creatingVehicle || editingVehicle) && (
        <VehicleForm
          vehicle={editingVehicle}
          onSuccess={() => {
            setEditingVehicle(null);
            setCreatingVehicle(false);
            fetchVehicles();
          }}
        />
      )}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Matrícula</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.marca}</td>
              <td>{v.modelo}</td>
              <td>{v.matricula}</td>
              <td>{v.estado}</td>
              <td>
                <button onClick={() => handleEdit(v)}>Editar</button>
                <button onClick={() => handleDelete(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
