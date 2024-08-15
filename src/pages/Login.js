import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../api'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const users = await loginUser(); 
            const user = users.find(
                (u) => u.username === username && u.password === password
            );
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('Login successful!');
                navigate('/cart');
            } else {
                setError('Invalid username or password');
                toast.error('Invalid username or password');
            }
        } catch (err) {
            setError('Error logging in');
            toast.error('Error logging in');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', px: 2 }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="h4" mb={2} textAlign="center">Login</Typography>
                    {error && <Typography color="error" mb={2} textAlign="center">{error}</Typography>}
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
