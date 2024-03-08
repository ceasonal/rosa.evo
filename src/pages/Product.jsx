import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";
import supabase from "../assets/config/SupabaseClient";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const Prod = () => {
  const [fetchErrors, setFetchErrors] = useState(null);
  const [displayProducts, setDisplayProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState("All");
  const [price, setPrice] = useState("Highest-Lowest");
  const [SoldOut, setSoldOut] = useState("False");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "category":
        setCategories(value);
        break;
      case "price":
        setPrice(value);
        break;
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
      let query = supabase.from("DisplayProducts").select("*");

      if (categories !== "All") {
        query = query.eq("category", categories);
      }

      if (price === "Highest-Lowest") {
        query = query.order("price", { ascending: false });
      } else if (price === "Lowest-Highest") {
        query = query.order("price", { ascending: true });
      }

      if (SoldOut !== "False") {
        query = query.in("sold_out", ["TRUE"]);
      } else if (SoldOut !== "True") {
        query = query.in("sold_out", ["FALSE"]);
      }

      const response = await query;

      const { data: DisplayProducts, error } = response;

      if (error) {
        setFetchErrors("Could not fetch products");
        setDisplayProducts(null);
        console.error(error);
      } else {
        setDisplayProducts(DisplayProducts);
        setTotalPages(Math.ceil(DisplayProducts.length / itemsPerPage));
        setFetchErrors(null);
      }
      setLoading(false);
    };

    fetchDisplayProducts();
  }, [categories, price, SoldOut]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                  {displayProducts.slice((page - 1) *  itemsPerPage, page * itemsPerPage).map((product) => (
                    <ProductCard
                      id={product.id}
                      product={product}
                      key={product.id}
                    />
                  ))}
                  <Grid container justifyContent="center" sx={{ mt: 3, mb:3 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      variant="outlined"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "black",
                          border: "1px solid #4D1F08",
                        },
                        "& .MuiPaginationItem-page.Mui-selected": {
                          backgroundColor: "#4D1F08",
                          color: "white",
                        },
                      }}
                    />
                  </Grid>
                </>
              ) : (
                <Grid container spacing={3} justifyContent="center">
                  <Box
                    sx={{
                      marginTop: 5,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="https://www.breathearomatherapy.com/assets/images/global/no-product.png"
                      alt="404"
                      style={{
                        width: "40%",
                        marginBottom: "20px",
                      }}
                    />
                    <Typography
                      gutterBottom
                      style={{
                        fontWeight: "bold", 
                        marginTop: "20px",
                        fontSize: "20px", 
                        color: '#4D1F08',
                        fontFamily: 'monospace'
                      }}
                    >
                      Products Not Found
                    </Typography>
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
