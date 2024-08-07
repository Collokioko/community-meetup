import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Dummy authentication check (replace with actual logic)
const isAuthenticated = () => {
    return !!localStorage.getItem('user'); // Check if 'user' exists in localStorage
};

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated()) {
            alert('You must be logged in to create an event. Redirecting to login...');
            navigate('/login');
            return;
        }

        // Handle event creation logic here
        alert(`Event created: ${title}, ${description}, ${date}, ${time}, ${location}`);
    };

    if (!isAuthenticated()) {
        return (
            <Container className="mt-5">
                <h1 className="mb-4 text-center">Create Event</h1>
                <p className="text-center">You need to be logged in to create an event. Please <a href="/login">login</a> or <a href="/register">Sign Up</a>.</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4 text-center">Create Event</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter event title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </Form.Group>
                
                <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter event description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </Form.Group>
                
                <Form.Group controlId="formDate" className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        required 
                    />
                </Form.Group>
                
                <Form.Group controlId="formTime" className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                        type="time" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        required 
                    />
                </Form.Group>
                
                <Form.Group controlId="formLocation" className="mb-4">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter event location" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Create Event
                </Button>
            </Form>
        </Container>
    );
};

export default CreateEvent;
