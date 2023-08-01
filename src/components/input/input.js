import React from 'react';
import TextField from '@mui/material/TextField';

const Input = (props) => {
  const { label, ...rest } = props;

  return (
    <TextField
      label={label}
      variant="outlined"
      color='success'
      fullWidth
      {...rest}
    />
  );
};

export default Input;