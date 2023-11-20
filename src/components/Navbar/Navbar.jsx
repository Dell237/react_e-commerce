import { ShoppingCart } from '@mui/icons-material';
import { AppBar, IconButton, Badge,Typography, Toolbar } from '@mui/material';
import React from 'react';
import logo from "../../assets/commerce.png";
import useStyle from "./styles";
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';


const Navbar = ({ totalItems }) => {
    const classes = useStyle();
    const location = useLocation();
    /* some part of your content to be invisible, behind the app bar. use Offset! */
    const Offset = styled("div")(({theme}) => theme.mixins.toolbar);
  return (
    <>
        <AppBar position='fixed' className={classes.appBar} color='inherit' >
            <Toolbar>
                <Typography component={RouterLink} to="/" variant='h6' className={classes.title}  color="inherit">
                    <img src={logo} alt='Webshop'  height="25px" className={classes.image}/>
                    Webshop
                </Typography>
                <Typography variant="h6" component="div"  />
                {location.pathname === '/' && (
                <div className={classes.button}>
                    <IconButton component={RouterLink} to="/cart" aria-label='show cart items' color='inherit'>
                        <Badge badgeContent={totalItems} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>)}
            </Toolbar>
        </AppBar>
        <Offset />
    </> 
    
  )
}

export default Navbar;