import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement your form submission logic here
        alert(`Message sent from ${name} (${email}): ${message}`);
    };

    return (
        <Container className="mt-5">
            <h1 className="contact-title">Contact Me</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Your Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Your Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formMessage" className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={4} 
                        placeholder="Your Message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send Message
                </Button>
            </Form>
        </Container>
    );
};

export default Contact;
