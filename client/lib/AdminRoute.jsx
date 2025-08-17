import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from './auth-helper';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const isAdmin = auth.isAdmin();
  
  if (!auth.isAuthenticated()) {
    // Redirect to signin if not authenticated
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }
  
  if (!isAdmin) {
    // Redirect to home if authenticated but not admin
    return <Navigate to="/" />;
  }
  
  return children;
};

export default AdminRoute;
