import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderedSuccessfull = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Successful!
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
        Thank you for your purchase. Your order has been placed successfully.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default OrderedSuccessfull;
