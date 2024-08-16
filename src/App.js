import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDetails from "./components/ProductDetails";
import Registration from "./pages/Registration";
import ErrorBoundary from "./components/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import OrderedSuccessfull from "./components/OrderedSuccessfull";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "";
  const location = useLocation();

  const hideHeaderRoutes = ["/registration", "/login", "/ordered-successfull"];

  return (
    <>
      <ErrorBoundary>
        <ToastContainer />
        {!hideHeaderRoutes.includes(location.pathname) && (
          <Header username={username} />
        )}
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/ordered-successfull" element={<OrderedSuccessfull />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
