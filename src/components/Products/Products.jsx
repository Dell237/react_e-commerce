import React from "react";
import  {Grid}  from "@mui/material";
import Product from "./Product/Product";
import useStyle from "./styles";


const Products = ({products, onAddToCart}) => {
    const classes = useStyle();
    return (
        <div className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justifyContent="center" alignItems="center" spacing={4}   marginTop={"25px"}>
                {products.map((product) =>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product  product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );

}

export default Products;