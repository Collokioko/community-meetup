// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/create-event">Create Event</Link>
                    </li>
                    <li>
                        <Link to="/events">View Events</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </nav>
            
        </div>
        
    );
};

export default Dashboard;
