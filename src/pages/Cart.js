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
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {cartItems.map((product) => (
              <Grid item xs={12} md={6} key={product.id || product.sku_code}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="300"
                    image={product.images?.front || "https://via.placeholder.com/300"}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Category: {product.main_category}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                      ₹{product.mrp?.mrp}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(product.id || product.sku_code)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography variant="h6" sx={{ mr: 2 }}>
                        Quantity:
                      </Typography>
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
                        sx={{ width: '60px', textAlign: 'center' }}
                      />
                      <IconButton
                        onClick={() => handleQuantityChange(product.id || product.sku_code, product.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" sx={{ textAlign: 'right', mb: 2 }}>
            Total: ₹{totalPrice}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6">Your cart is empty.</Typography>
      )}
    </Container>
  );
};

export default Cart;
