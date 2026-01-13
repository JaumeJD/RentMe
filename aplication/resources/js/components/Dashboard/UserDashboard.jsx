import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import UserProfileForm from "../User/Profile/ProfileForm";
import BookingTable from "../User/Booking/BookingTable";

export default function UserDashboard() {
  const { user: contextUser, setUser: setContextUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const fetchUser = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/user/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUser(res.data);
    setContextUser(res.data)
  };

  useEffect(() => { fetchUser(); }, []);

  return (
    <div>
      <h1>Panel de Usuario</h1>

      {/* BOTÓN */}
      <button onClick={() => setEditingProfile(true)}>
        Editar perfil
      </button>

      {/* FORMULARIO */}
      {editingProfile && user && (
        <UserProfileForm
          user={user}
          onSuccess={(updatedUser) => {
            setUser(updatedUser);          // actualizar estado local
            setContextUser(updatedUser);   // actualizar contexto
            localStorage.setItem("user", JSON.stringify(updatedUser)); // persistir
            setEditingProfile(false);
          }}
        />
      )}

      <hr />

      <BookingTable userView />
    </div>
  );
}
