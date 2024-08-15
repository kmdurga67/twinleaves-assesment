import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../api';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateUsername = (username) => {
        const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = async () => {
        const { username, password, confirmPassword, ...rest } = formData;

        if (!validateUsername(username)) {
            setError('Username must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one number.');
            toast.error('Invalid username format.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long which include one uppercase letter, one lowercase letter, and one number.');
            toast.error('Invalid password format.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            toast.error('Passwords do not match.');
            return;
        }

        try {
            await registerUser({ username, password, ...rest });
            toast.success('Registration successful!');
            navigate('/login');
        } catch (err) {
            setError('Error registering.');
            toast.error('Error registering.');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', px: 2 }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" mb={2} textAlign="center">Register</Typography>
                    {error && <Typography color="error" mb={2} textAlign="center">{error}</Typography>}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                name="username"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ mt: 2 }}>
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Registration;
