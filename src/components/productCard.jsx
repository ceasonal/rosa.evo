import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";

const useStyles = makeStyles({
  card: {
    borderRadius: "5%",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "transform 0.2s",
    },
  },
  grid: {
    margin: "20px 0",
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
});

const productCard = ({ product }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={product.image}
              title={product.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="monospace"
                color="#4D1F08"
              >
                {product.name || "Product Name"}
              </Typography>
              <Typography variant="body2" color="#4D1F08">
                Rs. {product.price || "Price"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default productCard;
