import { AuthContext } from '../../Service/Connection/AuthContext';
import Nav from '../Nav/Nav';
import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Avatar,
  Container,
  CircularProgress,
  Typography,
  Card,
  Button,
} from '@mui/material';
import Login from '../Login/Login';
import { getDatabase, ref, get, child } from 'firebase/database';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton } from '@mui/material';

function SportsNutrition() {
  const { user, loading, userInfo } = useContext(AuthContext);
  const dbRef = ref(getDatabase());
  const theme = useTheme();
  const { t } = useTranslation();
  const [procucts, setProcucts] = useState('');

  useEffect(() => {
    if (user && user.uid) {
      get(child(dbRef, `produtos`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setProcucts(data);
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userInfo]);

  const handleClick = () => {
    const phoneNumber = '19999669947'; // Substitua pelo número de telefone
    const message = 'Olá!'; // Substitua pela mensagem desejada
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `whatsapp://send?phone=+55019999669947&text=${encodedMessage}`;

    window.location.href = whatsappURL;
  };

  if (loading) {
    return <CircularProgress color={'success'} />;
  }
  if (!user) {
    return <Login />;
  }

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          sx={{ bgcolor: theme.palette.primary.main, marginRight: '16px' }}
        >
          <p style={{ color: theme.palette.textButton.main }}>
            {userInfo.nome && userInfo.nome[0] + userInfo.sobrenome[0]}
          </p>
        </Avatar>
        <p style={{ color: theme.palette.text.main }}>
          Bem-vindo(a), {userInfo.nome && userInfo.nome}!
        </p>
      </Box>
      <IconButton onClick={handleClick}>
        <WhatsAppIcon />
      </IconButton>
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {' '}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={'2rem'}
        >
          <Box display="flex" flexDirection="column" gap={'1rem'}>
            {Object.keys(procucts).length > 0 &&
              Object.keys(procucts)
                .reverse()
                .map((key) => (
                  <div key={key}>
                    <Card
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: '20px',
                      }}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        padding="10px"
                        gap="10px"
                      >
                        <img
                          style={{
                            width: '100px',
                            height: 'auto',
                            borderRadius: '20px',
                          }}
                          src={procucts[key]['url_prod_firebase']}
                          alt="GIF"
                        />
                        <Typography
                          variant="subtitle1"
                          color={theme.palette.grey.main}
                        >
                          {procucts[key]['descProduto']}
                        </Typography>
                      </Box>
                    </Card>
                  </div>
                ))}
          </Box>
        </Box>
      </Box>
      <Nav activeItems={3} />
    </Container>
  );
}

export default SportsNutrition;
