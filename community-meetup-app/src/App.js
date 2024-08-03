// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import './components/styles.css';

const App = () => (
    <Router>
        <div className="container">
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/events" element={<EventList />} />
            </Routes>
        </div>
    </Router>
);

export default App;
