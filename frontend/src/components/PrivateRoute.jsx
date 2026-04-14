import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { listenToAuthChanges } from "../services/authService";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = listenToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
