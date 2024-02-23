import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";
import supabase from "../assets/config/SupabaseClient";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const Prod = () => {
  const [fetchErrors, setFetchErrors] = useState(null);
  const [displayProducts, setDisplayProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState("All");
  const [price, setPrice] = useState("Highest-Lowest");
  // const [custom, setCustom] = useState("All");
  const [SoldOut, setSoldOut] = useState("False");

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "category":
        setCategories(value);
        break;
      case "price":
        setPrice(value);
        break;
      // case "custom":
      //   setCustom(value);
        // break;
      case "sold_out":
        setSoldOut(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchDisplayProducts = async () => {
      setLoading(true);
  
      try {
        // Fetch display_uuid from the wishlist table for a specific user
        const { data: {user}, } = await supabase.auth.getUser();
        const { data: wishlists, error: wishlistError } = await supabase
          .from('wishlist')
          .select('*')
          .eq('user_uuid', user.id)

        if (wishlistError) {
          throw new Error("Could not fetch wishlist");
        }
        // Extract display_uuids from the wishlist data
        const displayUuids = wishlists.map(wishlist => wishlist.display_uuid);
  
        let query = supabase.from("DisplayProducts").select("*");
  
        // Filter products based on display_uuid
        query = query.in('disp_uuid', displayUuids);
  
        // Apply category filter
        if (categories !== "All") {
          query = query.eq("category", categories);
        }
  
        // Apply price sorting
        if (price === "Highest-Lowest") {
          query = query.order("price", { ascending: false });
        } else if (price === "Lowest-Highest") {
          query = query.order("price", { ascending: true });
        }
  
        // Apply SoldOut filter
        if (SoldOut === "True") {
          query = query.eq("sold_out", true);
        } else if (SoldOut === "False") {
          query = query.eq("sold_out", false);
        }
  
        const response = await query;
  
        const { data: DisplayProducts, error } = response;
  
        if (error) {
          throw new Error("Could not fetch products");
        }
  
        setDisplayProducts(DisplayProducts);
        setFetchErrors(null);
      } catch (error) {
        // setFetchErrors(error.message);
        setDisplayProducts(null);
        console.error(error);
      }
  
      setLoading(false);
    };
  
    fetchDisplayProducts();
  }, [categories, price, SoldOut]);
  

  return (
    <>
      <Box sx={{ margin: "0 auto", maxWidth: 1200 }}>
        {fetchErrors && <p>{fetchErrors}</p>}
        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            Array.from(new Array(12)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
            ))
          ) : (
            <>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                  marginLeft: 2,
                }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl
                    sx={{ width: { xs: "40%", sm: "100%", md: "100%" } }}
                  >
                    <InputLabel id="jewel-categories">categories</InputLabel>
                    <Select
                      labelId="select-jewel-categories"
                      id="jewel-categories"
                      name="category"
                      value={categories}
                      label="category"
                      onChange={handleChange}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="necklace">Necklace</MenuItem>
                      <MenuItem value="earrings">Earring</MenuItem>
                      <MenuItem value="set">Set</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl
                    sx={{ width: { xs: "40%", sm: "100%", md: "100%" } }}
                  >
                    <InputLabel id="price-points">Price</InputLabel>
                    <Select
                      labelId="select-price-point"
                      id="price-points"
                      name="price"
                      value={price}
                      label="Price"
                      autoWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="Highest-Lowest">Highest-Lowest</MenuItem>
                      <MenuItem value="Lowest-Highest">Lowest-Highest</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                  <FormControl
                    sx={{ width: { xs: "40%", sm: "100%", md: "100%" } }}
                  >
                    <InputLabel id="select-sold_out">In Stock</InputLabel>
                    <Select
                      labelId="select-sold_out"
                      id="select-sold_out"
                      name="sold_out"
                      value={SoldOut}
                      label="sold_out"
                      autoWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="False">Available</MenuItem>
                      <MenuItem value="True">Sold Out</MenuItem>
                    </Select>
                  </FormControl>

                </Grid>
              </Grid>

              {displayProducts && displayProducts.length > 0 ? (
                <>
                  {displayProducts.map((product) => (
                    <ProductCard
                      id={product.id}
                      product={product}
                      key={product.id}
                    />
                  ))}
                </>
              ) : (
                <Grid container spacing={3} justifyContent="center">
                  <Box sx={{ marginTop: 5 }}>
                    <img
                      src="https://www.ssmed.in/images/notfound.png"
                      alt="no-product-found"
                      style={{ maxWidth: "100%" }}
                    />
                  </Box>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Prod;
