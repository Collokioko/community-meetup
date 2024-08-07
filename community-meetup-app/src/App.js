import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavbarComponent from './components/Navbar'; // Import the Navbar component
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import Contact from './components/Contact'; // Import the Contact component
import Home from './components/Home'; // Import the Home component
import './components/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Dummy authentication check (replace with actual logic)
const isAuthenticated = () => {
    // Logic to check if user is authenticated
    // For now, returning true as a placeholder
    return true; // Change this to false to test unauthenticated access
};

// Protected Route component
const ProtectedRoute = ({ element, ...rest }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => (
    <Router>
        <NavbarComponent /> {/* Include Navbar */}
        <div className="container mt-4">
            <Routes>
                <Route path="/" element={<Home />} /> {/* Add Home route */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/create-event" element={<ProtectedRoute element={<CreateEvent />} />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    </Router>
);

export default App;
