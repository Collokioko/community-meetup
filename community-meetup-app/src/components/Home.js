import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './styles.css';

const Home = () => {
    return (
        <>
            <Container className="home-container mt-5 text-center">
                <Row>
                    <Col>
                        <h1 className="home-title">Welcome to the Community Meetup</h1>
                        <p className="home-subtitle">
                            Your hub for organizing and managing community events. Join us to connect, engage, and create memorable experiences with like-minded individuals.
                        </p>
                        <Button variant="primary" size="lg" href="/events">
                            Explore Events
                        </Button>
                    </Col>
                </Row>
            </Container>

            <footer className="footer">
                <Container>
                    <Row>
                        <Col md={4} className="footer-section">
                            <h5>About Us</h5>
                            <p>Community Meetup is your go-to platform for finding, creating, and joining local events. Connect with your community and make a difference.</p>
                        </Col>
                        <Col md={4} className="footer-section">
                            <h5>Contact Us</h5>
                            <p>Email: info@communitymeetup.com</p>
                            <p>Phone: +123 456 7890</p>
                        </Col>
                        <Col md={4} className="footer-section text-center">
                            <h5>Follow Us</h5>
                            <div className="social-icons">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center mt-3">
                            <p>© 2024 Community Meetup. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default Home;
