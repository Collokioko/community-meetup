// src/components/EventList.js
import React, { useEffect, useState } from 'react';

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
        <div>
            <h1>Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <div>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>{event.date} - {event.time}</p>
                            <p>{event.location}</p>
                        </div>
                        <button onClick={() => handleRSVP(event._id)}>RSVP</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
