import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
   const { connected, loading } = useSelector((state) => state.zoho);

  if (loading) return <div>Loading...</div>; 

  if (!connected) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
