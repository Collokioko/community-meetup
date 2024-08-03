// src/components/CreateEvent.js
import React, { useState } from 'react';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Event created: ${title}, ${description}, ${date}, ${time}, ${location}`);
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
