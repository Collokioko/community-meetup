import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import Contact from './components/Contact';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './components/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <Router>
        <NavbarComponent />
        <div className="container mt-4">
            <Routes>
                <Route path="/" element={<Home />} />
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
