import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserForm from "./UserForm";

export default function UserTable() {
  
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [creating, setCreating] = useState(false);

  const handleEdit = (user) => {
    setEditingUser(user);
    setCreating(false);
    fetchUsers();
  };

  const handleCreate = () => {
    setEditingUser(null);
    setCreating(true);
    fetchUsers();
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    await axios.delete(`http://localhost:8000/api/v1/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <button onClick={handleCreate}>Nuevo Usuario</button>
      {creating && <UserForm />}
      {editingUser && <UserForm user={editingUser} onSuccess={()=>{
        setEditingUser(null);
        fetchUsers();
      }}/>}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
