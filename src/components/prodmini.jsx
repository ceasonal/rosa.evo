// import React from 'react';
// import { Grid, Card, CardMedia, CardContent, Typography, styles } from '@mui/material';

// const useStyles = styles((theme) => ({
//   card: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     height: '100%',
//   },
//   cardMedia: {
//     paddingTop: '56.25%', // 16:9 ratio
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
// }));

// const ProductDisplay = ({ products }) => {
//   const classes = useStyles();

//   if (!products || products.length === 0) {
//     return <div>No products to display.</div>;
//   }

//   return (
//     <Grid container spacing={2}>
//       {products.map((product) => (
//         <Grid item xs={12} sm={6} md={4} key={product.id}>
//           <Card className={classes.card}>
//             <CardMedia
//               className={classes.cardMedia}
//               component="img"
//               alt={product.name}
//               height="140"
//               image={product.image || 'default-image-url'}
//             />
//             <CardContent className={classes.cardContent}>
//               <Typography gutterBottom variant="h6" component="div">
//                 {product.name}
//               </Typography>
//               <Typography variant="subtitle1" color="text.secondary">
//                 Price: ${product.price}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {product.description}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default ProductDisplay;
