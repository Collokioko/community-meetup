import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { loginUser } from '../services/apiService'; // Use the centralized API service

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Use the loginUser function from your apiService
            const response = await loginUser({ email, password });
            localStorage.setItem('authToken', response.data.token);
            navigate('/');  // Redirect to the home or dashboard after successful login
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid credentials, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom align="center">
                Login
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleLogin}>
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
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>
            </form>
            <Box textAlign="center" marginTop={2}>
                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Button color="primary" onClick={() => navigate('/register')}>
                        Register
                    </Button>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
