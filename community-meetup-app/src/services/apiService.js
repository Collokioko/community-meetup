import axios from 'axios';

// Set the base URL for your backend API
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the URL if needed
});

// Interceptor to add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Adjust according to how you store the token
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const logoutUser = () => localStorage.removeItem('token'); // Simple logout by removing token
export const createEvent = (eventData) => API.post('/events', eventData);
export const getEvents = () => API.get('/events');
export const rsvpEvent = (eventId) => API.post(`/events/${eventId}/rsvp`);
export const getUserProfile = () => API.get('/users/profile');
export const updateUserProfile = (userData) => API.put('/users/profile', userData);
