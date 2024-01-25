import React, { useEffect, useState } from "react";
import Prodcomp from "../components/prodmini";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import supabase from "../assets/config/SupabaseClient";
import Skeleton from "@mui/material/Skeleton";
import { Select, MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";

const Prod = () => {
  const [fetchErrors, setFetchErrors] = useState(null);
  const [displayProducts, setDisplayProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState("All");
  const [price, setPrice] = useState("Highest-Lowest");
  const [custom, setCustom] = useState("All");

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "types":
        setTypes(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "custom":
        setCustom(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchDisplayProducts = async () => {
      setLoading(true);
      let query = supabase.from("DisplayProducts").select("*");

      // Apply filters based on selected options
      if (types !== "All") {
        query = query.eq('type', types);
      }else if(types=="earring"){
        query=query.eq('type',types)
      }else if(types=="necklace"){
        query=query.eq('type',types)
      }
  
      if (price === 'Highest-Lowest') {
        query = query.order('price', { ascending: false });
      } else if (price === 'Lowest-Highest') {
        query = query.order('price', { ascending: true });
      }

      if (custom !== 'All') {
        query = query.eq('customizable', custom === 'customizable');
      }

      const response = await query;

      const { data: DisplayProducts, error } = response;

      if (error) {
        setFetchErrors("Could not fetch products");
        setDisplayProducts(null);
        console.error(error);
      } else {
        console.log(DisplayProducts);
        setDisplayProducts(DisplayProducts);
        setFetchErrors(null);
      }
      setLoading(false);
    };

    fetchDisplayProducts();
  }, [types, price, custom]);

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
                  marginLeft:2,
                }}
              >
                <Grid item xs={12} sm={6} md={4}>
                <FormControl sx={{ width: { xs: "40%", sm: "100%", md: "100%" } }}>
                    <InputLabel id="jewel-types">Types</InputLabel>
                    <Select
                      labelId="select-jewel-types"
                      id="jewel-types"
                      name="types"
                      value={types}
                      label="Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="necklace">Necklace</MenuItem>
                      <MenuItem value="earring">Earring</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
    
                <Grid item xs={12} sm={6} md={4}>
                <FormControl sx={{ width: { xs: "40%", sm: "100%", md: "100%" } }}>
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
                  <FormControl sx={{ width: { xs: "40%", sm: "100%", md: "100%" } }}>
                    <InputLabel id="select-custom">Custom</InputLabel>
                    <Select
                      labelId="select-custom-option"
                      id="select-custom"
                      name="custom"
                      value={custom}
                      label="Custom"
                      autoWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="customizable">Customizable</MenuItem>
                      <MenuItem value="notCustomizable">Not Customizable</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
    
              {displayProducts && displayProducts.length > 0 ? (
                <>
                {displayProducts.map((product) => (
                  <Prodcomp id={product.id} product={product} key={product.id} />
                ))}
                </>
              ) : (
                <Grid container spacing={3} justifyContent="center">
                  <Box sx={{ marginTop: 5 }}>
                    <img src="https://www.ssmed.in/images/notfound.png" alt="no-product-found" style={{ maxWidth: "100%" }}/>
                  </Box>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Prod;
