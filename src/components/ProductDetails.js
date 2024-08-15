import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { fetchProducts } from '../api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProducts();
                const foundProduct = data.products.find(p => p.id === id);
                setProduct(foundProduct);
            } catch (error) {
                console.error('Error fetching product details', error);
            }
        };
        getProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

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
                <Typography variant="body1">{product.description || 'No description available'}</Typography>
                <Typography variant="body2" color="textSecondary">Category: {product.main_category}</Typography>
                <Typography variant="body2" color="textSecondary">Price: ₹{product.mrp.mrp}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProductDetails;
