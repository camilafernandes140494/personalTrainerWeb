import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomButtonWithLabel = ({
  label,
  onClick,
  icons,
  sizeCustom,
  variantCustom,
  colorCustom,
}) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      variant={variantCustom}
      size={sizeCustom}
      color={colorCustom}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: !icons ? '15px' : '0px',
          justifyContent: 'flex-end',
        }}
      >
        {icons}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.textButton.main,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Button>
  );
};

export default CustomButtonWithLabel;
