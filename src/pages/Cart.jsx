import React, { useState, useEffect } from "react";
import { Button, Drawer, Badge, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Paper, Divider } from "@mui/material";
import { ShoppingCart, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import  supabase  from "../assets/config/SupabaseClient";

const Cart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
    supabase 
    .channel('room1')
      .on('postgres_changes', { event: '*', schema: '*' }, payload => {
        console.log('Change received!', payload);
        fetchCartItems(); 
      })
      .subscribe();

    return () => {
      supabase.removeChannel('room1');
      
    };
  }, []);

  const fetchCartItems = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', itemId);

      if (error) {
        throw error;
      }

      fetchCartItems();
    } catch (error) {
      console.error('Error deleting cart item:', error.message);
    }
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.prod_price, 0);
    const shipping = 200;
    const tax = 30;
    const total = subtotal + shipping + tax;
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    };
  };
  const { subtotal, shipping, tax, total } = getTotalPrice();
  return (
    <>
      <Badge
        badgeContent={cartItems.length}
        color="error"
        onClick={handleDrawerOpen}
        sx={{ color: "#4D1F08", cursor: "pointer" }}
      >
        <ShoppingCart />
        <Typography
                      textAlign="center"
                      style={{ color: "#4D1F08", fontFamily: "monospace", marginLeft:20 }}
                    >
                      Cart
                    </Typography>
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
                      <Avatar alt={item.prod_name} src={item.prod_image} />
                    </ListItemAvatar>
                    <ListItemText primary={item.prod_name} />
                    <Typography variant="h6" align="right">${item.prod_price}</Typography>
                    <IconButton onClick={() => handleDeleteItem(item.id)} color="error">
                      <Delete />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}
        <ListItem alignItems="flex-start" sx={{ mt: 2 }}>
                <ListItemText primary="Subtotal" />
                <Typography variant="h6" align="right">${subtotal}</Typography>
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText primary="Shipping" />
                <Typography variant="h6" align="right">${shipping}</Typography>
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText primary="Tax" />
                <Typography variant="h6" align="right">${tax}</Typography>
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <ListItemText primary="Total" />
                <Typography variant="h6" align="right">${total}</Typography>
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
