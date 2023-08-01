import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const Card = (props) => {
  const { label, ...rest } = props;

  return (
    <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        Título do Card
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Conteúdo do Card
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Ação 1</Button>
      <Button size="small">Ação 2</Button>
    </CardActions>
  </Card>
  );
};

export default Input;