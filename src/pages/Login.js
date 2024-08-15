import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
                navigate('/home');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Error logging in');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" mb={2}>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
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
            <Button variant="contained" onClick={handleLogin} fullWidth>
                Login
            </Button>
        </Box>
    );
};

export default Login;
