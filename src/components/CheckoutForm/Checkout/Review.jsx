import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';



const Review = ({checkoutToken}) => {
  return (
    <>
    <Typography variant="h6" style={{ padding: '10px 10px' }} gutterBottom>Bestellübersicht</Typography>
    <List disablePadding>
      {checkoutToken.line_items.map((product) => (
        <ListItem style={{ padding: '10px' }} key={product.name}>
          <ListItemText primary={product.name} secondary={`Menge: ${product.quantity}`} />
          <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px' }}>
        <ListItemText  primary="Zwischensumme" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          {checkoutToken.subtotal.formatted_with_symbol}
        </Typography>
      </ListItem>
    </List>
  </>
  )
}

export default Review;