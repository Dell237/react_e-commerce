import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';


const  FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({}) =>(
         <TextField
          fullWidth
          label={label}
          required={required}
          />
        )}
      />
    </Grid>
  );
}

export default FormInput;