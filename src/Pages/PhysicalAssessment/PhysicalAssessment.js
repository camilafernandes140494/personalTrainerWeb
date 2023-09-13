import { AuthContext } from '../../Service/Connection/AuthContext';
import Nav from '../Nav/Nav';
import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
// import { useTranslation } from 'react-i18next';
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

function PhysicalAssessment() {
  const { user, loading, userInfo } = useContext(AuthContext);
  const dbRef = ref(getDatabase());
  const theme = useTheme();
  // const { t } = useTranslation();
  const [physicalAssessment, setPhysicalAssessment] = useState([]);
  const [training, setTraining] = useState('');

  useEffect(() => {
    if (user && user.uid) {
      get(child(dbRef, `avaliacaofisica/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setPhysicalAssessment(data);
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

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
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={'2rem'}
        >
          <Box display="flex" flexDirection="column" gap={'1rem'}>
            {Object.keys(physicalAssessment).length > 0 &&
              Object.keys(physicalAssessment).map((key) => (
                <div key={key}>
                  <Card
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: '20px',
                    }}
                    onClick={() => [setTraining(key)]}
                  >
                    <Button onClick={() => [setTraining(key)]}>
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
                          Avaliação
                        </Typography>
                        <Typography variant="caption" color={fixDate(key)[1]}>
                          {fixDate(key)[0]}
                        </Typography>
                      </Box>
                    </Button>
                  </Card>
                </div>
              ))}
          </Box>

          {physicalAssessment[training] && (
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '20px',
                padding: '20px',
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography color={theme.palette.text.main}>
                  {fixDate(training)[0]}
                </Typography>
                <Typography variant="caption" color={theme.palette.text.main}>
                  Objetivo:{' '}
                  {physicalAssessment[training]['Objetivo']['Objetivos']}
                </Typography>
                <Typography variant="caption" color={theme.palette.text.main}>
                  Peso: {physicalAssessment[training]['Peso e Altura']['Peso']}{' '}
                  kg
                </Typography>
                <Typography variant="caption" color={theme.palette.text.main}>
                  Altura:{' '}
                  {physicalAssessment[training]['Peso e Altura']['Altura']} cm
                </Typography>
                <Box>
                  <Typography variant="caption" color={theme.palette.text.main}>
                    IMC: {physicalAssessment[training]['Peso e Altura']['IMC']}
                    {' | '}
                  </Typography>
                  <Typography variant="caption" color={theme.palette.text.main}>
                    {
                      physicalAssessment[training]['Peso e Altura'][
                        'ImcDescricao'
                      ]
                    }
                  </Typography>
                </Box>
                <Typography variant="caption" color={theme.palette.text.main}>
                  Frequência Cardíaca:{' '}
                  {
                    physicalAssessment[training]['FC e PA'][
                      'Frequência Cardíaca'
                    ]
                  }{' '}
                  bpm
                </Typography>
                <Typography variant="caption" color={theme.palette.text.main}>
                  Pressão Arterial:{' '}
                  {physicalAssessment[training]['FC e PA']['Pressão Arterial']}{' '}
                  mmHg
                </Typography>
                <Typography variant="h6" color={theme.palette.primary.main}>
                  Circunferências
                </Typography>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', md: 'row' }}
                  alignItems={'center'}
                  gap={'10px'}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    {Object.keys(
                      physicalAssessment[training]['Circunferências']
                    ).map((key, value) => (
                      <Typography
                        variant="caption"
                        color={theme.palette.text.main}
                      >
                        {key} : {value} cm
                      </Typography>
                    ))}
                  </Box>
                  <img
                    style={{
                      width: '160px',
                      height: 'auto',
                      borderRadius: '20px',
                    }}
                    src={
                      'https://firebasestorage.googleapis.com/v0/b/personalgustavofernandes-f0dd5.appspot.com/o/PhysicalAssessment%2Fbody.png?alt=media&token=8724985c-6cd8-4f72-9402-d511d0fd1469'
                    }
                    alt="GIF"
                  />
                </Box>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
      <Nav activeItems={2} />
    </Container>
  );
}

export default PhysicalAssessment;
