import React, { useState, useEffect } from "react";
import { Button, Drawer, Badge, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Paper, Divider } from "@mui/material";
import { ShoppingCart, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Cart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDeleteItem = (itemId) => {
    // Remove the item from the cart
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    updateCartState(updatedCart);
  };

  const updateCartState = (updatedCart) => {
    // Update local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update local state
    setCartItems(updatedCart);
  };

  useEffect(() => {
    // Retrieve cart information from local storage
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartFromLocalStorage);
  }, []);

  const handleAddToCart = (newItem) => {
    // Update local storage and state
    const updatedCart = [...cartItems, newItem];
    updateCartState(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Badge
        badgeContent={cartItems.length}
        color="error"
        onClick={handleDrawerOpen}
        sx={{ color: "#4D1F08", cursor: "pointer" }}
      >
        <ShoppingCart />
      </Badge>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <Paper sx={{ p: 2, width: "300px" }}>
          <Button onClick={handleDrawerClose} sx={{ mb: 2 }}>
            Close
          </Button>
          <Typography variant="h5" align="center" mb={2}>
            Cart
          </Typography>
          {cartItems.length > 0 ? (
            <List>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
                    <ListItemAvatar>
                      <Avatar alt={item.name} src={item.image} />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                    <Typography variant="h6" align="right">${item.price}</Typography>
                    <IconButton onClick={() => handleDeleteItem(item.id)} color="error">
                      <Delete />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}
              <ListItem alignItems="flex-start" sx={{ mt: 2 }}>
                <ListItemText primary="Total" />
                <Typography variant="h6" align="right">${getTotalPrice()}</Typography>
              </ListItem>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/checkout"
                sx={{ mt: 2, width: "100%" }}
              >
                Checkout
              </Button>
            </List>
          ) : (
            <Typography variant="body1" align="center">
              No items in the cart. Please buy something!
            </Typography>
          )}
        </Paper>
      </Drawer>

    </>
  );
};

export default Cart;
