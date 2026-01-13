import React, {useState} from "react";
import VehicleTable from "../Admin/Vehicles/VehicleTable";
import UserTable from "../Admin/Users/UserTable";
import BookingTable from "../Admin/Bookings/BookingTable";

export default function DashboardAdmin() {
  
  const [activeTab, setActiveTab] = useState("vehicles")

  return (
    <div>
      <h1>Dashboard de Administrador</h1>
      
      <nav>
        <button onClick={() => setActiveTab("vehicles")}>Vehículos</button>
        <button onClick={() => setActiveTab("users")}>Usuarios</button>
        <button onClick={() => setActiveTab("bookings")}>Reservas</button>
      </nav>

      <div>
        {activeTab === "vehicles" && <VehicleTable />}
        {activeTab === "users" && <UserTable />}
        {activeTab === "bookings" && <BookingTable />}
      </div>
    </div>
  );
}
