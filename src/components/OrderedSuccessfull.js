import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderedSuccessfull = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ my: 6, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', textAlign: 'center', p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Order Successful!
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
            Thank you for your purchase. Your order has been placed successfully.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ px: 5, py: 1.5, fontSize: '1rem' }}
          >
            Back to Home
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default OrderedSuccessfull;
