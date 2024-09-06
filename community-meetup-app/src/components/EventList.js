import React, { useEffect, useState } from 'react';
import { Container, Button, ListGroup, ListGroupItem, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import './styles.css'; // Make sure to add your custom styles here

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/events');
                setEvents(data); // Use data directly from the response
            } catch (err) {
                setError('Failed to load events.');
            }
        };
        fetchEvents();
    }, []);

    const handleRSVP = async (eventId) => {
        setError('');
        setSuccess('');
        try {
            const token = localStorage.getItem('authToken');
            await axios.post(
                `http://localhost:5000/api/events/${eventId}/rsvp`,
                {},
                { headers: { 'x-auth-token': token } }
            );
            setSuccess(`RSVP successful for event ID: ${eventId}`);
            // Optionally, you can update the local state to reflect RSVP status
        } catch (err) {
            setError('RSVP failed. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4 text-center">Upcoming Events</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <ListGroup>
                {events.map(event => (
                    <ListGroupItem key={event._id} className="event-item">
                        <Row>
                            <Col md={8}>
                                <h5>{event.title}</h5>
                                <p>{event.description}</p>
                                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {event.time}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                            </Col>
                            <Col md={4} className="text-md-right text-center">
                                <Button 
                                    variant="primary" 
                                    onClick={() => handleRSVP(event._id)}
                                >
                                    RSVP
                                </Button>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default EventList;
