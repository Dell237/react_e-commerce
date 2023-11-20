import { Container, Typography, Button, Grid, CircularProgress, Toolbar } from '@mui/material';
import React from 'react';
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link as RouterLink} from 'react-router-dom';



const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    

    const classes = useStyles();
    

    const EmptyCart = () =>(
        <Typography variant='subtitle1'>Sie haben keine Artikel in Ihrem Warenkorb!</Typography>
    );
    const FilledCart = () =>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) =>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} handleUpdateCartQty={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4" gutterBottom marginTop={"25px"}>Zwischensumme: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button onClick={handleEmptyCart} className={classes.emptyButton}  size="large" type="button" variant="contained" color="secondary" >Artikel entfernen</Button>
                <Button component={RouterLink} to="/checkout" className={classes.checkoutButton}  size="large" type="button" variant="contained" color="primary">Bezahlen</Button>
        </div>
      </div>
        </>
    );
    if (!cart.line_items) return(
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"50%"}}>
                        <CircularProgress />
                    </div>

    );  

  return (
    <Container>
        <Toolbar className={classes.toolbar}/>
        <Typography className={classes.titel} variant='h3' gutterBottom marginTop={"25px"}>Dein Einkaufswagen</Typography>
        {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
    </Container>
  )
}

export default Cart;