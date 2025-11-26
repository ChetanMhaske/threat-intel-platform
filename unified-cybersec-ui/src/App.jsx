// src/App.jsx

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Network from "./pages/Network";
import IDS from "./pages/IDS";
import Ransomware from "./pages/Ransomware";
import Negotiator from "./pages/Negotiator";
import Backup from "./pages/Backup";
import Settings from "./pages/Settings";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Protected group: requires JWT token */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/network" element={<Network />} />
        <Route path="/ids" element={<IDS />} />
        <Route path="/ransomware" element={<Ransomware />} />
        <Route path="/negotiator" element={<Negotiator />} />
        <Route path="/backup" element={<Backup />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Optional: fallback */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
