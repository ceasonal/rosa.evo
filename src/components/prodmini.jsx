import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';

const ProductDisplay = ({ product }) => {
  console.log(product);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
        <CardActionArea>
          <Card sx={{ maxWidth: 245, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', marginTop: 3 }}>
            <CardMedia
              component="img"
              height="50%"
              image={product.image || 'default-image-url'}
              style={{ objectFit: 'contain' }}
              alt={product.name || 'Product Name'} 
            />
          </Card>
          <CardContent sx={{ textAlign: 'center', mt: 2, padding: 2 }}>
            <Typography gutterBottom variant="h6" component="div">
              {product.name || 'Product Name'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${product.price || 'Price'} 
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductDisplay;
