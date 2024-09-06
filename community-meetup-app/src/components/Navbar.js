import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext'; // Assuming you're using AuthContext for authentication
import './styles.css'; // Assuming you have some additional styles in styles.css

const NavbarComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, logout } = useAuth(); // Use auth state and logout function from AuthContext

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };

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
                <Nav className="ml-auto"> {/* Aligns to the right */}
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
                    {auth ? (
                        <Nav.Link as="button" onClick={handleLogout} className="nav-link logout-button">
                            Logout
                        </Nav.Link>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register" className={location.pathname === '/register' ? 'active' : ''}>
                                Register
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
