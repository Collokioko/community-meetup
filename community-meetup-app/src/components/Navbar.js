import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './styles.css'; // Assuming you have some additional styles in styles.css

const NavbarComponent = () => {
    const location = useLocation();

    return (
        <Navbar bg="light" expand="lg" className="navbar" sticky="top">
            <Navbar.Brand as={Link} to="/" className="navbar-brand">
                <img
                    src="/path/to/logo.png"
                    alt="Community Meetup"
                    style={{ width: '30px', marginRight: '10px' }} // Optional: adjust logo size
                />
                Community Meetup
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link 
                        as={Link} 
                        to="/" 
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} 
                        to="/dashboard" 
                        className={location.pathname === '/dashboard' ? 'active' : ''}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} 
                        to="/create-event" 
                        className={location.pathname === '/create-event' ? 'active' : ''}
                    >
                        Create Event
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} 
                        to="/events" 
                        className={location.pathname === '/events' ? 'active' : ''}
                    >
                        Event List
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} 
                        to="/contact" 
                        className={location.pathname === '/contact' ? 'active' : ''}
                    >
                        Contact Me
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
