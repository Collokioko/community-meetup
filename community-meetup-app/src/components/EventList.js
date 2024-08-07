import React, { useEffect, useState } from 'react';
import { Container, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

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
            <h1 className="mb-4 text-center">Events</h1>
            <ListGroup>
                {events.map(event => (
                    <ListGroupItem key={event._id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{event.title}</h5>
                            <p>{event.description}</p>
                            <p>{event.date} - {event.time}</p>
                            <p>{event.location}</p>
                        </div>
                        <Button variant="primary" onClick={() => handleRSVP(event._id)}>RSVP</Button>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default EventList;
