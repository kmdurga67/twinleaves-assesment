import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.images.front || 'placeholder-image-url'}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">{product.main_category}</Typography>
                <Typography variant="body2" color="textSecondary">Price: ₹{product.mrp.mrp}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onAddToCart(product)}
                    fullWidth
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
