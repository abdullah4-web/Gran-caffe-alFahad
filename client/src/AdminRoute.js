import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Pages/AuthContext';

export default function AdminRoute({ children }) {
  const { state } = useContext(AuthContext); // Use useContext hook to access AuthContext
  const { user } = state;
  
  // Check if the user is an admin
  const isAdmin = user && user.isAdmin;

  return isAdmin ? children : <Navigate to="/login" />;
}
