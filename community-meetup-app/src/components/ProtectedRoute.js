import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!localStorage.getItem('user'); // Replace with actual authentication logic
    };

    return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
