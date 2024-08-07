import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Community Meetup</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/create-event">Create Event</Nav.Link>
                <Nav.Link as={Link} to="/events">Event List</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact me</Nav.Link>
                {/* Add links for Register and Login if needed */}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default NavbarComponent;
