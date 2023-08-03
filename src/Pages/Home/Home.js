import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Service/Connection/AuthContext";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Avatar,
  Container,
  CircularProgress,
  ThemeProvider,
} from "@mui/material";
import { getDatabase, ref, get, child } from "firebase/database";
import Login from "../Login/Login";
import Nav from "../Nav/Nav";

function Home() {
  const theme = useTheme();
  const { user, loading, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});

  const successPhrases = [
    "No pain, no gain.",
    "O sucesso é a recompensa por esforços incansáveis.",
    "Acredite em si mesmo e você já está a meio caminho do sucesso.",
    "A persistência é a chave mestra que abre as portas do sucesso.",
    "O sucesso não é apenas uma meta, é uma jornada constante de aprimoramento.",
    "Grandes conquistas exigem grande dedicação e sacrifício.",
    "Quanto maior o desafio, mais glorioso é o triunfo.",
    "O fracasso é apenas uma oportunidade para recomeçar de forma mais inteligente.",
    "Não deixe que os obstáculos o impeçam, supere-os e siga em frente.",
    "O verdadeiro sucesso é alcançado quando você se esforça além de seus limites.",
    "Seja obstinado em suas metas e flexível em suas estratégias.",
    "O sucesso é a soma de pequenos esforços repetidos diariamente.",
    "As dificuldades são testes que preparam pessoas comuns para conquistas extraordinárias.",
    "Acredite que você pode e você está no meio do caminho para alcançar.",
    "Lute com paixão e colherá sucesso com satisfação.",
  ];

  function getSuccessPhrases() {
    const indiceAleatorio = Math.floor(Math.random() * successPhrases.length);
    return successPhrases[indiceAleatorio];
  }
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
            console.log("No data available");
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
    <ThemeProvider theme={theme}>
      <Container>
        <Nav activeItems={0} />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            sx={{ bgcolor: theme.palette.primary.main, marginRight: "16px" }}
          >
            <p style={{ color: theme.palette.primary.contrastText }}>
              {userInfo.nome && userInfo.nome[0] + userInfo.sobrenome[0]}
            </p>
          </Avatar>
          <p style={{ color: theme.palette.primary.contrastText }}>
            Bem-vindo(a), {userInfo.nome && userInfo.nome}!
          </p>
        </Box>
        <p style={{ color: theme.palette.primary.contrastText }}>
          {fraseAleatoria}
        </p>
        <button onClick={logout}>Logout</button>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
