import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Box,
} from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const productData = product || {};

  if (!productData && !id) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">No product data available.</Typography>
      </Container>
    );
  }

  const displayProduct = productData;

  const handleAddToCart = () => {
    navigate('/registration', { state: { redirect: '/login', product: displayProduct } });
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt={displayProduct.name}
              height="300"
              image={displayProduct.images?.front || "https://via.placeholder.com/300"}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {displayProduct.name}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Category: {displayProduct.main_category}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ₹{displayProduct.mrp?.mrp}
              </Typography>
              <Typography variant="body1" paragraph>
                {displayProduct.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
