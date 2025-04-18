import React, { useEffect, useState } from "react";
import "./ManageUsers.css";
import { useNavigate } from "react-router-dom";  // For redirection


const ManageUsers = () => {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
 
  
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="5">No users found.</td></tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
