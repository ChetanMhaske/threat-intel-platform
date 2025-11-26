// src/ProtectedRoute.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  // Frontend-only demo: always allow
  // (keeps route structure consistent for real backend later)
  return <Outlet />;
}
