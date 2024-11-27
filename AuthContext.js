// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        axios.get('http://localhost:5000/users/me', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setUser(response.data))
            .catch(err => console.log(err));
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
