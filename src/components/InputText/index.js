import React from 'react';
import { Controller, FormProvider } from "react-hook-form";
import { TextField } from '@material-ui/core';


const InputText = ({ name, label, control, error, required }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required
      }}
      render={({ field }) => (
        <TextField
          label={label}
          variant="outlined"
          size="small"
          fullWidth
          error={error}
          helperText={error?.message}
          InputLabelProps={{
            shrink: field.value,
          }}
          {...field}
        />
      )} />
  )
}

export default InputText;
