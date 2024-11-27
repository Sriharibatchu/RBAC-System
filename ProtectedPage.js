// src/pages/ProtectedPage.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedPage = () => {
    const { user } = useContext(AuthContext);

    if (!user || !user.permissions.includes('access_protected_page')) {
        return <h1>Access Denied</h1>;
    }

    return <h1>Protected Content</h1>;
};

export default ProtectedPage;
