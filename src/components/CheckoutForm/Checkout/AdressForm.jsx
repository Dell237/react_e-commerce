import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from "./CustomTextField";
import { commerce } from '../../../lib/commerce';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AdressForm = ({ checkoutToken, next }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');


  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
  const Subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
  const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));
  


  const fetchshippingCountries = async (checkoutTokenId) =>{
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  const fetchSubdivisions = async (CountryCode) =>{
    const {subdivisions} = await commerce.services.localeListSubdivisions(CountryCode);
  
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);

  }

  const fetchShippingOptions = async (checkoutTokenId, country, region= null) =>{
    const option = await commerce.checkout.getShippingOptions(checkoutTokenId, {country , region});

    setShippingOptions(option);
    setShippingOption(option[0].id);
  }



  useEffect(() =>{
      fetchshippingCountries(checkoutToken.id);
      
  }, []);
  
  useEffect(() =>{
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  },[shippingCountry]);

  useEffect(() =>{
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  },[shippingSubdivision]);
 
  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>Lieferadresse</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
            <Grid container spacing={3}>              
              <FormInput name="Firmenname(Optional)" label="Firmenname(Optional)" />
              <FormInput required name="firstName" label="Vorname" />
              <FormInput required name="lastName" label="Nachname " />
              <FormInput required name="address1" label="Address" />
              <FormInput required name="email" label="E-Mail" />
              <FormInput required name="city" label="Ort" />
              <FormInput required name="zip" label="PLZ" />
              <Grid item xs={12} sm={6}>
              <InputLabel>Lieferungsland</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) =>setShippingCountry(e.target.value)}>
                {countries.map((country) =>(
                  <MenuItem key={country.id} value={country.id}>
                   {country.label}
                  </MenuItem>
                ))}
                  
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>PLZ</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) =>setShippingSubdivision(e.target.value)}>
                {Subdivisions.map((Subdivision) =>(
                  <MenuItem key={Subdivision.id} value={Subdivision.id}>
                   {Subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Versandoption</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) =>(
                  <MenuItem key={option.id} value={option.id}>
                   {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            </Grid>
            <br />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding:"20px" }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AdressForm;