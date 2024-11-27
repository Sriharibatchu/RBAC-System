// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
    <div>
        <h1>Dashboard</h1>
        <Link to="/users">Manage Users</Link>
        <Link to="/roles">Manage Roles</Link>
    </div>
);

export default Dashboard;
