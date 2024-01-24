import React, { useEffect, useState } from "react";
import Prodcomp from "../components/prodmini";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import supabase from "../assets/config/SupabaseClient";

const Prod = () => {
  const [fetchErrors, setFetchErrors] = useState(null);
  const [displayProducts, setdisplayProducts] = useState(null);

  useEffect(() => {
    const fetchDisplayProducts = async () => {
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
    };
    fetchDisplayProducts();
  }, []);

  return (
    <>
      <Box sx={{ margin: "0 auto", maxWidth: 1200 }}>
        {fetchErrors && <p>{fetchErrors}</p>}
        <Grid container spacing={3} justifyContent="center">
          {displayProducts && (
            <>
              {displayProducts.map((product) => (
                <>
                <Prodcomp id={product.id} product={product} /> 
                </>
              ))}
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Prod;


// import supabase from "../assets/config/SupabaseClient"
// import { useEffect, useState } from "react"

// const Prod = () =>{
//   const [fetchErrors, setFetchErrors] = useState(null)
//   const [displayProducts, setDisplayProducts] = useState(null)

//   useEffect(()=>{
//     const fetchDisplayProducts = async () =>{
//       const { data, error } = await supabase
//       .from('productDisplay')
//       .select()

//       if(error){
//         setFetchErrors("Could not fetch products")
   
//         console.error(error)
//       }
//       if(data) {
//         console.log(data)
//         setDisplayProducts(data)
//         setFetchErrors(null)
//       }
//     }
//     fetchDisplayProducts()
//   },[])

//   return(
//     <>
//       {fetchErrors && (<p>{fetchErrors}</p>)}
//       {displayProducts && (
//         <>
//           {displayProducts.map(product => (
//             <div>
//               <h2>{product.name}</h2>
//             </div>
//           ))}
//         </>
//       )}
//     </>
//   )
// }

// export default Prod;