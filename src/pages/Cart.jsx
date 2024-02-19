import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../assets/config/SupabaseClient";
import PaymentButton from "../components/payment";
import { ShoppingCart, Clear } from "@mui/icons-material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Drawer,
  Badge,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
const Cart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingTypeExists, setShippingTypeExists] = useState(false);

  useEffect(() => {
    fetchCartItems();
    supabase
      .channel("room1")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
        fetchCartItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel("room1");
    };
  }, []);

  const fetchCartItems = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        throw error;
      }

      setCartItems(data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  };
  useEffect(() => {
    fetchShippingAddress();
    supabase
      .channel("room2")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
        fetchShippingAddress();
      })
      .subscribe();

    return () => {
      supabase.removeChannel("room2");
    };
  }, []);
  const fetchShippingAddress = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("user")
        .select("type")
        .eq("user_uuid", user.id)
        .single();
      if (error) {
        throw error;
      }
      if (data && data.type) {
        setShippingTypeExists(true); // Set state to true if shipping type exists
        setShippingAddress(data.type);
      } else {
        setShippingTypeExists(false); // Set state to false if shipping type doesn't exist
      }
    } catch (error) {
      console.error("Error fetching shipping address:", error.message);
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
      const { error } = await supabase.from("cart").delete().eq("id", itemId);

      if (error) {
        throw error;
      }

      fetchCartItems();
    } catch (error) {
      console.error("Error deleting cart item:", error.message);
    }
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.prod_price,
      0
    );
    const shipping = 200;
    const tax = 30;
    const total = subtotal + shipping + tax;
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
  };
  const { subtotal, shipping, tax, total } = getTotalPrice();
  const isMobileScreens = useMediaQuery("(max-width:599px)");
  return (
    <>
      <Badge
        badgeContent={cartItems.length}
        color="error"
        onClick={handleDrawerOpen}
        sx={{ color: "#4D1F08", cursor: "pointer" }}
      >
        <ShoppingCart />
        {isMobileScreens && (
          <Typography
            textAlign="center"
            style={{
              color: "#4D1F08",
              fontFamily: "monospace",
              marginLeft: 20,
            }}
          >
            Cart
          </Typography>
        )}
      </Badge>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div
          style={{
            overflowX: "hidden",
            backgroundColor:'rgba(224, 205, 194, 0.3)',
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              p: 2,
              width: "100%",
              maxWidth: "80vw",
              minWidth: "300px",
              height: "100vh",
              overflow:'auto',
              WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
              "&::-webkit-scrollbar": {
                display: "none", // Hide the scrollbar for WebKit browsers
              },
            backgroundColor:'rgba(224, 205, 194, 0.3)',
              "@media (min-width: 600px)": {
                maxWidth: "50vw",
                minWidth: "400px",
              },
            }}
          >
            <Button onClick={handleDrawerClose} sx={{ mb: 2, color:'#7B4A0C' }}>
              Close
            </Button>
            <Typography variant="h5" align="center" mb={2} sx={{color:'#7B4A0C',fontFamily:'monospace'}}>
              Cart
            </Typography>
            {cartItems.length > 0 ? (
                              <>
              <List>
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <ListItem alignItems="center" sx={{ mb: 2 }}>
                      <ListItemAvatar sx={{ marginRight: 2 }}>
                        <Avatar
                          alt={item.prod_name}
                          src={item.prod_image}
                          variant="rounded"
                          sx={{ width: 80, height: 80 }}
                        />
                      </ListItemAvatar>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        flex={1}
                      >
                        <Stack direction="column" spacing={0}>
                          <ListItemText primary={item.prod_name} />
                          <Typography variant="h6" sx={{ paddingLeft: 2 }}>
                            ₹ {item.prod_price}
                          </Typography>
                        </Stack>
                        <IconButton onClick={() => handleDeleteItem(item.id)}>
                          <Clear />
                        </IconButton>
                      </Stack>
                    </ListItem>
                  </div>
                ))}
                <Divider />
                {shippingTypeExists && (
                  <>
                    <Typography variant="body1" sx={{ mt: 2, paddingLeft: 2 }}>
                      Ship to
                    </Typography>
                    <div
                      style={{ display: "flex", alignItems: "center", mt: 1 }}
                    >
                      <IconButton sx={{ mr: 1 }}>
                        <HomeIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {shippingAddress}
                      </Typography>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </div>
                  </>
                )}
                {!shippingTypeExists && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, width: "100%" }}
                    component={Link}
                    to="/user/dashboard/details"
                    onClick={handleDrawerClose}
                  >
                    Add Shipping Address
                  </Button>
                )}
                <Divider />
                <ListItem alignItems="flex-start" sx={{ mt: 1 }}>
                  <ListItemText primary="Subtotal" />
                  <Typography variant="subtitle1" align="right">
                    ₹ {subtotal}
                  </Typography>
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Shipping" />
                  <Typography variant="subtitle1" align="right">
                    ₹ {shipping}
                  </Typography>
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Tax" />
                  <Typography variant="subtitle1" align="right">
                    ₹ {tax}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" align="right">
                    ₹ {total}
                  </Typography>
                </ListItem>
                <Divider />
                <PaymentButton disabled={!shippingTypeExists}/>
              </List>
              </>
            ) : (
              <>   
              <Typography variant="body1" align="center" sx={{ fontSize: 20,}}>
                No items in the cart. Please buy something!
              </Typography>
                <AddShoppingCartIcon sx={{
                  fontSize: 100 ,
                  color:'#7B4A0C',
                  display: "block",
                  margin: "auto",
                  marginTop: 20,
                }} />
              </>
            )}
          </Paper>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
