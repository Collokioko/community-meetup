import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Create Event</Card.Title>
                            <Card.Text>
                                Create and manage your events here.
                            </Card.Text>
                            <Link to="/create-event">
                                <Button variant="primary">Go to Create Event</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>View Events</Card.Title>
                            <Card.Text>
                                Browse and manage your upcoming events.
                            </Card.Text>
                            <Link to="/events">
                                <Button variant="primary">View Events</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>User Profile</Card.Title>
                            <Card.Text>
                                Manage your profile and settings.
                            </Card.Text>
                            <Link to="/profile">
                                <Button variant="primary">Go to Profile</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
