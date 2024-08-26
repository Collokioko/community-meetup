import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            // Mock API call to register a new user
            await axios.post('http://localhost:5000/api/register', { name, email, password });
            setSuccess('Registration successful! You can now log in.');
            setTimeout(() => {
                navigate('/login');  // Redirect to login after a short delay
            }, 2000);
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom align="center">
                Sign Up
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <Box textAlign="center" marginTop={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        fullWidth
                        sx={{ py: 1.5 }}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </Box>
            </form>
            <Box textAlign="center" marginTop={2}>
                <Typography variant="body2">
                    Already have an account? <Button color="primary" onClick={() => navigate('/login')}>Login</Button>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;
