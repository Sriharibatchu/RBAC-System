import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ManageUsers from "./components/ManageUsers";
import ManageRoles from "./components/ManageRoles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-roles" element={<ManageRoles />} />
      </Routes>
    </Router>
  );
}

export default App;
