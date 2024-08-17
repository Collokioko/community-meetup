import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles.css'; // Import your custom styles

const Home = () => {
    return (
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
    );
};

export default Home;
