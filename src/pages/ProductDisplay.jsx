import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../assets/config/SupabaseClient.js";
import Footer from "../components/footer.jsx";
import WishButton from "../components/wishButton";
import { makeStyles } from "@mui/styles";
import { Typography, Grid, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Devider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "16px",
  },
  productImage: {
    maxWidth: "100%",
    maxHeight: "480px",
  },
  productDetails: {
    padding: "16px",
  },
  section: {
    marginBottom: "16px",
  },
  iconWithText: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
}));

const ProductDetails = ({ token }) => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [status, setStatus] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
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
        if (data.sold_out === true) {
          setStatus(true);
        }
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = async (product) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // if productuuid already exists in table then dont add to cart else add to cart
      const { data: cartData, error: cartError } = await supabase
        .from("cart")
        .select("*")
        .eq("prod_uuid", product.disp_uuid)
        .eq("user_id", user.id)
        .single();
      if (cartData && !cartError) {
        console.log("Product already exists in cart");
        return;
      }
      let res = await supabase.from("cart").upsert([
        {
          prod_name: product.name,
          user_id: user.id,
          prod_price: product.price,
          prod_image: product.image,
          prod_uuid: product.disp_uuid,
        },
      ]);
      console.log("Added to cart");
    } catch (e) {
      console.log(e);
    }
  };

  const classes = useStyles();

  return (
    <>
      {productDetails && (
        <>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={productDetails.image}
                  alt="Product"
                  className={classes.productImage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.productDetails}>
                  <div className={classes.section}>
                    <Typography variant="h4" gutterBottom fontFamily="serif">
                      {productDetails.name}{" "}
                      <Chip
                        label={productDetails.category}
                        color="secondary"
                        sx={{ ml: 1, backgroundColor: "#957461" }}
                      />
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      ₹ {productDetails.price}
                    </Typography>
                  </div>
                  <div className={classes.section}></div>
                  <Devider />
                  <div className={classes.section}>
                    <div className={classes.iconWithText}>
                      <DescriptionIcon
                        sx={{ marginRight: "8px", color: "#685043" }}
                      />
                      <Typography variant="subtitle1">Description</Typography>
                    </div>
                    <Typography variant="body1">
                      {productDetails.description}
                    </Typography>
                  </div>
                  <Devider />
                  <div className={classes.section}>
                    <div className={classes.iconWithText}>
                      <LocalShippingIcon
                        sx={{ marginRight: "8px", color: "#685043" }}
                      />
                      <Typography variant="subtitle1">Shipping</Typography>
                    </div>
                    <Typography variant="body1">
                      We offer shipping within India via Bluedart or Delhivery
                      courier service. Delivery time may vary from 8-9 days
                      depending on location & product availability.
                    </Typography>
                  </div>
                  <Devider />
                  <div className={classes.section}>
                    <div className={classes.iconWithText}>
                      <MonetizationOnIcon
                        sx={{ marginRight: "8px", color: "#685043" }}
                      />
                      <Typography variant="subtitle1">Payment</Typography>
                    </div>
                    <Typography variant="body1">
                      For online orders you can pay through the following
                      methods: credit cards.
                    </Typography>
                    <Devider />
                  </div>
                  {token ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => addToCart(productDetails)}
                        disabled={status === true ? true : false}
                        // onClick={checkStatus}
                        disableElevation
                        sx={{
                          backgroundColor: "#957461",
                          "&:hover": {
                            backgroundColor: "#685043",
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                      <WishButton />
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => setIsSnackbarOpen(true)}
                        disableElevation
                        sx={{
                          backgroundColor: "#957461",
                          "&:hover": {
                            backgroundColor: "#685043",
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                      <WishButton onClick={() => setIsSnackbarOpen(true)} />
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
                          Please login to add to cart / wishlist
                        </MuiAlert>
                      </Snackbar>
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      <Footer sx={{ mt: 3 }} />
    </>
  );
};

export default ProductDetails;
