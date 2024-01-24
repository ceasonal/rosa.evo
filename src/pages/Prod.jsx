import React, { useEffect, useState } from "react";
import Prodcomp from "../components/prodmini";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import supabase from "../assets/config/SupabaseClient";
import Skeleton from '@mui/material/Skeleton';

const Prod = () => {
  const [fetchErrors, setFetchErrors] = useState(null);
  const [displayProducts, setdisplayProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDisplayProducts = async () => {
      setLoading(true);
      const response = await supabase.from("DisplayProducts").select("*");

      console.log(response);

      const { data: DisplayProducts, error } = response;

      if (error) {
        setFetchErrors("Could not fetch products");
        setdisplayProducts(null);
        console.error(error);
      } else {
        console.log(DisplayProducts);
        setdisplayProducts(DisplayProducts);
        setFetchErrors(null);
      }
      setLoading(false);
    };
    fetchDisplayProducts();
  }, []);

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
            displayProducts && (
              <>
                {displayProducts.map((product) => (
                  <Prodcomp id={product.id} product={product} />
                ))}
              </>
            )
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Prod;