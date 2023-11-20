import React, { useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button  } from '@mui/material';
import { useState } from 'react';
import useStyles from "./styles";
import AdressForm from "../Checkout/AdressForm";
import PaymentForm from "../Checkout/PaymentForm";
import { commerce } from '../../../lib/commerce';
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Lieferadresse', 'Zahlungsdetails'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
    const [shippingData, setShippingData] = useState({});
    const history = useNavigate();

    useEffect(() =>{
        const generateToken = async () =>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type:"cart"});
                setCheckoutToken(token);

            }catch(error){
               history("/");

            }
        }
        generateToken();
    },[]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
    
    const next = (data) =>{
        setShippingData(data);
        nextStep();
    }
 
    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

    const Form = () => activeStep === 0
        ? <AdressForm  checkoutToken={checkoutToken} next={next} />
        : <PaymentForm
            shippingData={shippingData}
            checkoutToken={checkoutToken}
            backStep={backStep}
            onCaptureCheckout={onCaptureCheckout} 
            nextStep={nextStep}
        />

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
            <Paper className={classes.paper}>
            <Typography style={{ margin: '10px' }} variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
        </>
    )
}

export default Checkout