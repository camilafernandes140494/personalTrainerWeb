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
import CustomButtonWithLabel from '../../components/button/button';

function Training() {
  const { user, loading, userInfo } = useContext(AuthContext);
  const dbRef = ref(getDatabase());
  const theme = useTheme();
  const { t } = useTranslation();
  const [trainingInfo, setTrainingInfo] = useState([]);
  const [training, setTraining] = useState('');
  const [time, setTime] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };
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

  if (loading) {
    return <CircularProgress color={'success'} />;
  }
  if (!user) {
    return <Login />;
  }

  function fixDate(date) {
    var partes = date.split('-');
    var day = partes[0];
    var month = partes[1];
    var year = partes[2];
    if (month.length === 1) {
      month = '0' + month;
    }
    var newDateOld = new Date(year, month, day);

    var dateOld = day + '/' + month + '/' + year;
    var today = new Date();

    if (newDateOld > today) {
      return [dateOld, theme.palette.text.main];
    } else if (newDateOld < today) {
      return [dateOld, 'red'];
    } else {
      return [dateOld, theme.palette.text.main];
    }
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
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: '20px',
                    }}
                  >
                    <Button
                      onClick={() => [
                        setTraining(key),
                        setSelectedTraining(null),
                      ]}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        padding="10px"
                      >
                        <Typography
                          variant="subtitle1"
                          color={theme.palette.grey.main}
                        >
                          Treino {key}
                        </Typography>
                        <Typography
                          variant="caption"
                          color={fixDate(Object.keys(trainingInfo[key])[0])[1]}
                        >
                          {fixDate(Object.keys(trainingInfo[key])[0])[0]}
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
              <>
                <Typography variant="h6" color={theme.palette.text.main}>
                  Treino {training}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ border: '2px solid', padding: 1, borderRadius: 30 }}
                  color={theme.palette.primary.main}
                >
                  {formatTime(time)}
                </Typography>
                <Box display="flex" gap={'1rem'}>
                  <CustomButtonWithLabel
                    variantCustom={'contained'}
                    label={'Iniciar'}
                    onClick={handleStart}
                  />
                  <CustomButtonWithLabel
                    variantCustom={'contained'}
                    label={'Pausar'}
                    onClick={handlePause}
                  />
                  <CustomButtonWithLabel
                    variantCustom={'contained'}
                    label={'Resetar'}
                    onClick={handleReset}
                  />
                </Box>
              </>
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
                          backgroundColor: theme.palette.secondary.main,
                          borderRadius: '30px',
                          width: '280px',
                        }}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              style={{
                                width: '160px',
                                height: 'auto',
                                borderRadius: '20px',
                                border: '1px solid rgba(128, 128, 128, 0.5)',
                                display:
                                  selectedTraining === key ? 'block' : 'none',
                              }}
                              src={trainingInfo[training][key]['giff']}
                              alt="GIF"
                            />
                          </Box>
                          {selectedTraining !== key && (
                            <CustomButtonWithLabel
                              variantCustom={'contained'}
                              onClick={() => setSelectedTraining(key)}
                              label={'Play'}
                            />
                          )}

                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="h6"
                              color={theme.palette.text.main}
                            >
                              Treino {key}
                            </Typography>

                            <Checkbox defaultChecked={false} size="small" />
                          </Box>
                          <Typography variant="body1" color="text.secondary">
                            {trainingInfo[training][key]['tamanho']}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Pausa: {trainingInfo[training][key]['tempo_pausa']}{' '}
                            segundos
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
