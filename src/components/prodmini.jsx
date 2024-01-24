import { Card, CardActionArea, CardContent, Typography, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  card: {
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'transform 0.2s',
    },
  },
  grid: {
    margin: '20px 0',
  },
});

const ProductDisplay = ({ product }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
      <Link to={`/products/${product.id}`}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent sx={{ textAlign: 'center', mt: 2, padding: 2 }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
              <Typography gutterBottom variant="h5" component="div">
                {product.name || 'Product Name'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ${product.price || 'Price'} 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default ProductDisplay;