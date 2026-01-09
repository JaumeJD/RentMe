import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfileForm from "../User/Profile/ProfileForm";
import BookingTable from "../User/Booking/BookingTable";

export default function UserDashboard() {

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/user/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUser(res.data);
  };

  useEffect(() => { fetchUser(); }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Panel de Usuario</h1>

      <BookingTable userView />
    </div>
  );
}
