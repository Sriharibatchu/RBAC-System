import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: 'lightgray' }}>
            <Link to="/" style={{ margin: '10px' }}>Dashboard</Link>
            <Link to="/users" style={{ margin: '10px' }}>Users</Link>
            <Link to="/roles" style={{ margin: '10px' }}>Roles</Link>
        </nav>
    );
};

export default Navbar;
