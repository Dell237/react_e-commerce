import React from 'react';
import { Typography, Button, Divider } from '@mui/material';
import {Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from "./Review";

const stripePromise =loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep}) => {
  const handleSubmit = async (event, elements, stripe) =>{
    event.prevantDefault();

    if(!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { 
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry 
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }

  }

  
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '10px 0', padding:"10px" }}>Zahlungsmethode</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button style={{ margin: '10px' }}  variant="outlined" onClick={backStep}>Back</Button>
              <Button style={{ margin: '10px' }} type="submit" variant="contained" disabled={!stripe} color="primary">
                Pay {checkoutToken.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm;