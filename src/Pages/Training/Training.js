import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Service/Connection/AuthContext';
import Nav from '../Nav/Nav';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Avatar,
  Container,
  CircularProgress,
  Typography,
  Grid,
  Card,
  Button,
} from '@mui/material';
import Login from '../Login/Login';
import { getDatabase, ref, get, child } from 'firebase/database';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function Training() {
  const { user, loading, userInfo } = useContext(AuthContext);
  const dbRef = ref(getDatabase());
  const theme = useTheme();
  const { t } = useTranslation();
  const [trainingInfo, setTrainingInfo] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      get(child(dbRef, `treinos/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setTrainingInfo(data);
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userInfo]);

  console.log(
    Object.keys(trainingInfo).length > 0 && Object.keys(trainingInfo['A'])[0]
  );

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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {Object.keys(trainingInfo).length > 0 &&
            Object.keys(trainingInfo).map((key) => (
              <div key={key}>
                <Card
                  sx={{
                    width: '30%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1%',
                    alignItems: 'center',
                  }}
                >
                  <Button>
                    <FitnessCenterIcon fontSize="large" />
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6" color="text.secondary">
                        Treino {key}
                      </Typography>
                      <Typography color="text.secondary">
                        {Object.keys(trainingInfo[key])[0]}
                      </Typography>
                    </Box>
                  </Button>
                </Card>
              </div>
            ))}
        </Grid>
        <Grid item xs={6}>
          {Object.keys(trainingInfo).length > 0 &&
            Object.keys(trainingInfo).map((key) => (
              <div key={key}>
                <Card
                  sx={{
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1%',
                  }}
                >
                  <Button>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6" color="text.secondary">
                        Treino {key}
                      </Typography>
                      <Typography color="text.secondary">
                        {Object.keys(trainingInfo[key])[0]}
                      </Typography>
                    </Box>
                  </Button>
                </Card>
              </div>
            ))}
        </Grid>
      </Grid>
      <Nav activeItems={1} />
    </Container>
  );
}

export default Training;
