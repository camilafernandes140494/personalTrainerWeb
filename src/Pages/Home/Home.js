import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Service/Connection/AuthContext';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Avatar,
  Container,
  CircularProgress,
  ThemeProvider,
  Typography,
  Alert,
  Grid,
} from '@mui/material';
import { getDatabase, ref, get, child } from 'firebase/database';
import Login from '../Login/Login';
import Nav from '../Nav/Nav';
import CustomButtonWithLabel from '../../components/button/button';
import { useTranslation } from 'react-i18next';
import auth from '../../Service/Connection';
import { sendPasswordResetEmail } from 'firebase/auth';

function Home() {
  const theme = useTheme();
  const { user, loading, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const { t } = useTranslation();
  const successPhrases = [
    'No pain, no gain.',
    'O sucesso é a recompensa por esforços incansáveis.',
    'Acredite em si mesmo e você já está a meio caminho do sucesso.',
    'A persistência é a chave mestra que abre as portas do sucesso.',
    'O sucesso não é apenas uma meta, é uma jornada constante de aprimoramento.',
    'Grandes conquistas exigem grande dedicação e sacrifício.',
    'Quanto maior o desafio, mais glorioso é o triunfo.',
    'O fracasso é apenas uma oportunidade para recomeçar de forma mais inteligente.',
    'Não deixe que os obstáculos o impeçam, supere-os e siga em frente.',
    'O verdadeiro sucesso é alcançado quando você se esforça além de seus limites.',
    'Seja obstinado em suas metas e flexível em suas estratégias.',
    'O sucesso é a soma de pequenos esforços repetidos diariamente.',
    'As dificuldades são testes que preparam pessoas comuns para conquistas extraordinárias.',
    'Acredite que você pode e você está no meio do caminho para alcançar.',
    'Lute com paixão e colherá sucesso com satisfação.',
  ];

  function getSuccessPhrases() {
    const indiceAleatorio = Math.floor(Math.random() * successPhrases.length);
    return successPhrases[indiceAleatorio];
  }

  const resetPassword = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        <Alert severity="success" color="info">
          This is a success alert — check it out!
        </Alert>;
      })
      .catch((error) => {
        // Tratar erro de login
        console.log(error);
      });
  };

  const dbRef = ref(getDatabase());
  const fraseAleatoria = getSuccessPhrases();
  useEffect(() => {
    if (user && user.uid) {
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setUserInfo(snapshot.val());
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  if (loading) {
    return <CircularProgress color="success" />;
  }
  if (!user) {
    return <Login />;
  }

  return (
    <Container>
      <Nav activeItems={0} />
      <Alert severity="success" color="info">
        This is a success alert — check it out!
      </Alert>
      ;
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
      >
        <Avatar
          sx={{ bgcolor: theme.palette.primary.main, marginRight: '16px' }}
        >
          <p style={{ color: theme.palette.primary.contrastText }}>
            {userInfo.nome && userInfo.nome[0] + userInfo.sobrenome[0]}
          </p>
        </Avatar>
        <p style={{ color: theme.palette.primary.contrastText }}>
          Bem-vindo(a), {userInfo.nome && userInfo.nome}!
        </p>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <CustomButtonWithLabel
            onClick={resetPassword}
            label={t('changePassword')}
          />
        </Grid>
        <Grid item>
          <CustomButtonWithLabel onClick={logout} label={t('logout')} />
        </Grid>
      </Grid>
      <Typography
        variant="body1"
        sx={{
          backgroundColor: theme.palette.primary.dark,
          padding: '15px',
          borderRadius: '10px',
          color: theme.palette.primary.contrastText,
          textAlign: 'center',
          marginTop: '20px',
          fontStyle: 'italic',
        }}
      >
        {fraseAleatoria}
      </Typography>
    </Container>
  );
}

export default Home;
