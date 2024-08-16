import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Grid,
} from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    if (location.state && location.state.product) {
      setProductData(location.state.product);
    } else {
      const fetchProduct = async () => {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProductData(data);
      };
      fetchProduct();
    }
  }, [id, location.state]);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!user) {
      navigate('/registration', { state: { from: `/product/${id}`, product: productData } });
    } else {
      const existingProductIndex = cart.findIndex((item) => item.id === productData.id || item.sku_code === productData.sku_code);
      
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push({ ...productData, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      navigate('/cart');
    }
  };

  if (!productData && !id) {
    return <Container><Typography>No product data available.</Typography></Container>;
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 3 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              alt={productData.name || "Product Image"}
              height="100%"
              image={productData.images?.front || "https://via.placeholder.com/300"}
              sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                {productData.name || "Product Name"}
              </Typography>
              <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                Category: {productData.main_category || "N/A"}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                ₹{productData.mrp?.mrp || "N/A"}
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                {productData.description || "No description available."}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddToCart} 
                  sx={{ padding: '10px 20px', fontSize: '16px' }}
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductDetails;
