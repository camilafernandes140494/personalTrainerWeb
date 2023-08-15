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
  Card,
  Button,
  Checkbox,
} from '@mui/material';
import Login from '../Login/Login';
import { getDatabase, ref, get, child } from 'firebase/database';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CustomButtonWithLabel from '../../components/button/button';

function Training() {
  const { user, loading, userInfo } = useContext(AuthContext);
  const dbRef = ref(getDatabase());
  const theme = useTheme();
  const { t } = useTranslation();
  const [trainingInfo, setTrainingInfo] = useState([]);
  const [training, setTraining] = useState('');

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

  // console.log(
  //   Object.keys(trainingInfo).length > 0 && Object.keys(trainingInfo['A'])
  // );

  console.log(training && trainingInfo[training]['Abdominal Supra']);

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
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box display="flex" flexDirection="row" gap={'2rem'}>
          <Box display="flex" flexDirection="column" gap={'1rem'}>
            {Object.keys(trainingInfo).length > 0 &&
              Object.keys(trainingInfo).map((key) => (
                <div key={key}>
                  <Card
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button onClick={() => setTraining(key)}>
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
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={'1rem'}
          >
            {training && (
              <Typography variant="h6" color={theme.palette.text.main}>
                Treino {training}
              </Typography>
            )}
            {training &&
              Object.keys(trainingInfo[training]).map(
                (key, index) =>
                  index !== 0 && (
                    <div key={key}>
                      <Card
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          padding: '10px',
                        }}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <CustomButtonWithLabel
                            variantCustom={'contained'}
                            // onClick={logout}
                            label={'Play'}
                          />
                          <Checkbox
                            defaultChecked
                            color="success"
                            size="small"
                          />
                          <Typography variant="h6">Treino {key}</Typography>
                          <Typography variant="h6" color="text.secondary">
                            {trainingInfo[training][key]['tempo_pausa']}
                          </Typography>
                        </Box>
                      </Card>
                    </div>
                  )
              )}
          </Box>
        </Box>
      </Box>
      <Nav activeItems={1} />
    </Container>
  );
}

export default Training;
