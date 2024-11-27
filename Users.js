// src/pages/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

  // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, [users]);

    const addUser = async () => {
        const response = await axios.post('http://localhost:5000/users', { name, role });
        setUsers([...users, response.data]);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
    };

    return (
        <div>
        <h1>Manage Users</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="User Name" />
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
        <button onClick={addUser}>Add User</button>

        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Users;
