import React, { useEffect, useState } from 'react';
import { Container, Button, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import './styles.css'; // Make sure to add your custom styles here

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const mockEvents = [
            { _id: 1, title: 'Event 1', description: 'Description 1', date: '2023-08-10', time: '10:00', location: 'Location 1' },
            { _id: 2, title: 'Event 2', description: 'Description 2', date: '2023-08-11', time: '11:00', location: 'Location 2' }
        ];
        setEvents(mockEvents);
    }, []);

    const handleRSVP = async (eventId) => {
        alert(`RSVP successful for event ID: ${eventId}`);
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4 text-center">Upcoming Events</h1>
            <ListGroup>
                {events.map(event => (
                    <ListGroupItem key={event._id} className="event-item">
                        <Row>
                            <Col md={8}>
                                <h5>{event.title}</h5>
                                <p>{event.description}</p>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Time:</strong> {event.time}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                            </Col>
                            <Col md={4} className="text-md-right text-center">
                                <Button variant="primary" onClick={() => handleRSVP(event._id)}>
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
