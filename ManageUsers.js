import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        } catch (error) {
        console.error("Error fetching users:", error);
        }
    };

    // Create a new user
    const createUser = async () => {
        try {
        const response = await axios.post("http://localhost:5000/api/users", {
            name,
            email,
            role,
        });
        setUsers([...users, response.data]); // Add the new user to the state
        setName("");
        setEmail("");
        setRole("");
        } catch (error) {
        console.error("Error creating user:", error);
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id)); // Remove the user from state
        } catch (error) {
        console.error("Error deleting user:", error);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
        <h2>Manage Users</h2>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={createUser}>Add User</button>

        <ul>
            {users.map((user) => (
            <li key={user._id}>
                {user.name} - {user.email} - {user.role}
                <button onClick={() => deleteUser(user._id)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default ManageUsers;
