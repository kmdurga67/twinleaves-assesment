import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetails from './components/ProductDetails';
import Registration from './pages/Registration';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('user');

    return (
        <>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
                    <Route path="/product/:id" element={isAuthenticated ? <ProductDetails /> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </ErrorBoundary>
        </>
    );
};

export default App;
