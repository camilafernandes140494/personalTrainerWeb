import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Service/Connection/AuthContext';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Avatar,
  Container,
  CircularProgress,
  Typography,
  Grid,
} from '@mui/material';
import { getDatabase, ref, get, child } from 'firebase/database';
import Login from '../Login/Login';
import Nav from '../Nav/Nav';
import CustomButtonWithLabel from '../../components/button/button';
import { useTranslation } from 'react-i18next';
import auth from '../../Service/Connection';
import { sendPasswordResetEmail } from 'firebase/auth';
import CustomModal from '../../components/modal/modal';
import CustomizedSnackbars from '../../components/toast/toast';

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
  const [snackbarData, setSnackbarData] = useState(null);

  function getSuccessPhrases() {
    const indiceAleatorio = Math.floor(Math.random() * successPhrases.length);
    return successPhrases[indiceAleatorio];
  }

  const resetPassword = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        setSnackbarData({
          openType: true,
          severityType: 'success',
          message: t('modal.sendEmail'),
        });
      })
      .catch((error) => {
        setSnackbarData({
          openType: true,
          severityType: 'error',
          message: { error },
        });
      });
  };

  const dbRef = ref(getDatabase());
  const fraseAleatoria = getSuccessPhrases();

  useEffect(() => {
    if (user && user.uid) {
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
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

  console.log(snackbarData);
  if (loading) {
    return <CircularProgress color={'success'} />;
  }
  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Container
        sx={{
          backgroundColor: theme.palette.secondary.main,
          padding: '1%',
          borderRadius: '20px',
        }}
      >
        {snackbarData && (
          <CustomizedSnackbars
            openType={snackbarData.openType}
            severityType={snackbarData.severityType}
            message={snackbarData.message}
          />
        )}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            sx={{ bgcolor: theme.palette.primary.main, marginRight: '16px' }}
          >
            <p style={{ color: theme.palette.primary.contrastText }}>
              {userInfo.nome && userInfo.nome[0] + userInfo.sobrenome[0]}
            </p>
          </Avatar>
          <p style={{ color: theme.palette.text.main }}>
            Bem-vindo(a), {userInfo.nome && userInfo.nome}!
          </p>
        </Box>
        <Grid
          sx={{ margin: '1%' }}
          container
          spacing={2}
          justifyContent="center"
        >
          <Grid item>
            <CustomModal
              title={t('changePassword')}
              titleModal={t('changePassword')}
              description={t('modal.description')}
              children={
                <Typography id="modal-modal-title">
                  {t('modal.description')}
                </Typography>
              }
              onSave={resetPassword}
              onSaveTitle={t('modal.receiveEmail')}
            />
          </Grid>
          <Grid item>
            <CustomButtonWithLabel
              variantCustom={'contained'}
              onClick={logout}
              label={t('logout')}
            />
          </Grid>
        </Grid>
        <Typography
          variant="body1"
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: '15px',
            borderRadius: '10px',
            color: theme.palette.primary.contrastText,
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {fraseAleatoria}
        </Typography>
      </Container>
      <Nav activeItems={0} />
    </>
  );
}

export default Home;
