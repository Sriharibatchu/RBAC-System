import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState('');
    const [permissions, setPermissions] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await axios.get('http://localhost:5000/roles');
            setRoles(response.data);
        };
        fetchRoles();
    }, [roles]);

    const addRole = async () => {
        const response = await axios.post('http://localhost:5000/roles', { role, permissions: permissions.split(',') });
        setRoles([...roles, response.data]);
    };

    const deleteRole = async (id) => {
        await axios.delete(`http://localhost:5000/roles/${id}`);
        setRoles(roles.filter(role => role._id !== id));
    };

    return (
        <div>
        <h1>Manage Roles</h1>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role Name" />
        <input type="text" value={permissions} onChange={(e) => setPermissions(e.target.value)} placeholder="Permissions (comma separated)" />
        <button onClick={addRole}>Add Role</button>

        <table>
            <thead>
            <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {roles.map((role) => (
                <tr key={role._id}>
                <td>{role.role}</td>
                <td>{role.permissions.join(', ')}</td>
                <td>
                    <button onClick={() => deleteRole(role._id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Roles;
