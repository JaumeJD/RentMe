import React,  { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VehicleForm({ vehicle = null }) {

  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    anio: "",
    matricula: "",
    bastidor: "",
    tipo: "",
    combustible: "",
    transmision: "",
    potencia: "",
    kilometros: "",
    asientos: "",
    estado: "disponible",
    precio_dia: "",
    precio_mes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Si viene un vehículo (editar)
  useEffect(() => {
  if (vehicle) {
    setForm(vehicle);
  } else {
    setForm({
      marca: "",
      modelo: "",
      anio: "",
      matricula: "",
      bastidor: "",
      tipo: "",
      combustible: "",
      transmision: "",
      potencia: "",
      kilometros: "",
      asientos: "",
      estado: "disponible",
      precio_dia: "",
      precio_mes: "",
    });
    setImages([]);
  }
}, [vehicle]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value);
  });

  images.forEach((img) => {
    formData.append("images[]", img);
  });

  try {
    if (vehicle) {
      formData.append("_method", "PUT");

      await axios.post(
        `http://localhost:8000/api/v1/admin/vehicles/${vehicle.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      await axios.post(
        `http://localhost:8000/api/v1/admin/vehicles`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    navigate("/admin");
  } catch (err) {
    console.error(err.response?.data || err);
    const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        "Error en los datos del vehículo.";

    setError(message)
  } finally {
    setLoading(false);
  }
};

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{vehicle ? "Editar vehículo" : "Nuevo vehículo"}</h2>
      {error && <p className="error">{error}</p>}
      <input name="marca" placeholder="Marca" onChange={handleChange} value={form.marca} required/>
      <input name="modelo" placeholder="Modelo" onChange={handleChange} value={form.modelo} required/>
      <input type="number" name="anio" placeholder="Año" onChange={handleChange} value={form.anio} required/>
      <input name="matricula" placeholder="Matrícula" onChange={handleChange} value={form.matricula} required/>
      <input name="bastidor" placeholder="Nº bastidor" onChange={handleChange} value={form.bastidor} required/>
      <select name="tipo" value={form.tipo} onChange={handleChange}>
        <option value="">Seleccionar tipo</option>
        <option value="turismo">Turismo</option>
        <option value="SUV">SUV</option>
        <option value="furgoneta">Furgoneta</option>
        <option value="camion">Camión</option>
        <option value="moto">Moto</option>
      </select>
      <select name="combustible" value={form.combustible} onChange={handleChange} required>
        <option value="">Seleccionar combustible</option>
        <option value="gasolina">Gasolina</option>
        <option value="diesel">Diésel</option>
        <option value="hibrido">Híbrido</option>
        <option value="electrico">Eléctrico</option>
      </select>
      <select name="transmision" value={form.transmision} onChange={handleChange} required>
        <option value="">Seleccionar transmisión</option>
        <option value="manual">Manual</option>
        <option value="automatico">Automático</option>
      </select>
      <input type="number" step="0.01" name="precio_dia" placeholder="Precio día" onChange={handleChange} value={form.precio_dia} />
      <input type="number" step="0.01" name="precio_mes" placeholder="Precio mes" onChange={handleChange} value={form.precio_mes} />
      <input type="number" name="kilometros" placeholder="Kilómetros" onChange={handleChange} value={form.kilometros} />
      <input type="number" name="asientos" placeholder="Asientos" onChange={handleChange} value={form.asientos} />
      <input type="number" name="potencia" placeholder="Potencia" onChange={handleChange} value={form.potencia} />
      <select name="estado" value={form.estado} onChange={handleChange}>
        <option value="disponible">Disponible</option>
        <option value="reservado">Reservado</option>
        <option value="alquilado">Alquilado</option>
        <option value="mantenimiento">Mantenimiento</option>
      </select>


      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />

      <button disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
