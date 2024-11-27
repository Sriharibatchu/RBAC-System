import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageRoles = () => {
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState("");

    // Fetch roles from the API
    const fetchRoles = async () => {
        try {
        const response = await axios.get("http://localhost:5000/api/roles");
        setRoles(response.data);
        } catch (error) {
        console.error("Error fetching roles:", error);
        }
    };

    // Create a new role
    const createRole = async () => {
        try {
        const response = await axios.post("http://localhost:5000/api/roles", {
            name: roleName,
            permissions: permissions.split(","),
        });
        setRoles([...roles, response.data]); // Add the new role to the state
        setRoleName("");
        setPermissions("");
        } catch (error) {
        console.error("Error creating role:", error);
        }
    };

    // Delete a role
    const deleteRole = async (id) => {
        try {
        await axios.delete(`http://localhost:5000/api/roles/${id}`);
        setRoles(roles.filter((role) => role._id !== id)); // Remove the role from state
        } catch (error) {
        console.error("Error deleting role:", error);
        }
    };

    // Fetch roles on component mount
    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div>
        <h2>Manage Roles</h2>
        <input
            type="text"
            placeholder="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
        />
        <input
            type="text"
            placeholder="Permissions (comma-separated)"
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
        />
        <button onClick={createRole}>Add Role</button>

        <ul>
            {roles.map((role) => (
            <li key={role._id}>
                {role.name} - {role.permissions.join(", ")}
                <button onClick={() => deleteRole(role._id)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default ManageRoles;
