import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { RemoveShoppingCart } from '@mui/icons-material';

const CartItem = ({ item, onRemove }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Price: ₹{item.mrp.mrp}</Typography>
                <IconButton color="secondary" onClick={() => onRemove(item.id)}>
                    <RemoveShoppingCart />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default CartItem;
