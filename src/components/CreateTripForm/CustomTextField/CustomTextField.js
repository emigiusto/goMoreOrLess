import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
            control={control}
            name={name}
            defaultValue=''
            render = {({ field})=> (
                <TextField {...field}
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