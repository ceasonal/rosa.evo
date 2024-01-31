import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../assets/config/SupabaseClient.js";
import Footer from "../components/footer.jsx";
import { Typography, Grid, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MuiAlert from "@mui/material/Alert";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Magnifier } from "react-image-magnifiers";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
const ProductDetails = ({ token }) => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [expanded, setExpanded] = useState("panel1");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) {
        console.error("Product ID is undefined");
        return;
      }

      const { data, error } = await supabase
        .from("DisplayProducts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product details:", error);
      } else {
        setProductDetails(data);
      }
    };

    fetchProductDetails();
  }, [id]);

  // use local storage
  const addToCart = (product) => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ ...product, quantity: 1 }])
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          margin: "auto",
          padding: { xs: 2, sm: 4, md: 8 },
          maxWidth: "100%",
          marginBottom: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: "8px",
            bgcolor: "rgba(224, 205, 194, 0.3)",
          }}
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {productDetails && (
              <>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    marginBottom: { xs: 2, md: 0 },
                    textAlign: "center",
                  }}
                >
                  <Magnifier
                    imageSrc={productDetails.image}
                    imageAlt="productImage"
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      borderRadius: "8px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: { xs: 2, md: 0 },
                    textAlign: { xs: "center", md: "start" },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 2,
                      textAlign: "center",
                      fontSize: { xs: "1.8rem", md: "2.5rem" },
                    }}
                  >
                    Rosa.evo
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
                    {productDetails.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    {productDetails.category}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 3, color: "#282c3e" }}>
                    Rs. {productDetails.price}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    PRICES DO NOT INCLUDE GST AND SHIPPING
                  </Typography>
                  {token ? (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => addToCart(productDetails)}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => setIsSnackbarOpen(true)}
                      >
                        Add to Cart
                      </Button>
                      <Snackbar
                        open={isSnackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        message="Please login to add to cart"
                        action={
                          <>
                            <IconButton
                              size="small"
                              aria-label="close"
                              color="inherit"
                              onClick={handleSnackbarClose}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          </>
                        }
                      >
                        <MuiAlert
                          elevation={6}
                          variant="filled"
                          onClose={handleSnackbarClose}
                          severity="error"
                        >
                          Please login to add to cart
                        </MuiAlert>
                      </Snackbar>
                    </>
                  )}
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <DescriptionIcon
                          sx={{ fontSize: 20, marginRight: 1 }}
                        />
                        Description
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{productDetails.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <LocalShippingIcon
                          sx={{ fontSize: 20, marginRight: 1 }}
                        />
                        Shipping
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        We offer shipping within India via Bluedart or Delhivery
                        courier service. Delivery time may vary from 8-9 days
                        depending on location & product availability.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <MonetizationOnIcon
                          sx={{ fontSize: 20, marginRight: 1 }}
                        />
                        Payment
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        For online orders you can pay through the following
                        methods: credit cards, debit cads/ netbanking.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default ProductDetails;
