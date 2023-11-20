import React from 'react'
import {Card, CardMedia, CardContent, CardActions, IconButton, Typography} from "@mui/material";
import { AddShoppingCart } from '@mui/icons-material';
import useStyle from "./styles";



const Product = ({ product, onAddToCart }) => {
    const classes = useStyle();

   
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} titel={product.name}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant='h5' gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant='h5' gutterBottom>
                    {product.price.formatted_with_symbol}
                </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{__html: product.description}} variant='body2' color="textSecondary"/>
        </CardContent>
        <CardActions  className={classes.cardActions}>
            <IconButton aria-label='Add to Cart' onClick={() =>( onAddToCart(product.id,1))}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  );
}

export default Product;