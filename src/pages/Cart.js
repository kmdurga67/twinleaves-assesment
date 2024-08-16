import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  IconButton,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    calculateTotalPrice(savedCart);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.quantity * (item.mrp?.mrp || 0),
      0
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      const updatedCart = cartItems.map((item) =>
        item.id === id || item.sku_code === id ? { ...item, quantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      calculateTotalPrice(updatedCart);
    }
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id && item.sku_code !== id
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  const handleCheckout = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    navigate('/ordered-successfull');
    console.log('Proceed to checkout');
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your Cart
      </Typography>
      {cartItems.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {cartItems.map((product) => (
              <Grid item xs={12} md={6} lg={4} key={product.id || product.sku_code}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="200"
                    image={product.images?.front || "https://via.placeholder.com/300"}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Category: {product.main_category}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ₹{product.mrp?.mrp}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(product.id || product.sku_code)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleQuantityChange(product.id || product.sku_code, product.quantity - 1)}
                          disabled={product.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={product.quantity}
                          onChange={(e) =>
                            handleQuantityChange(product.id || product.sku_code, Number(e.target.value))
                          }
                          type="number"
                          inputProps={{ min: 1 }}
                          sx={{ width: '60px', textAlign: 'center', mx: 1 }}
                        />
                        <IconButton
                          onClick={() => handleQuantityChange(product.id || product.sku_code, product.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Total: ₹{totalPrice}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ px: 4 }}>
              Checkout
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty.
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
