import React, { useState } from "react";
import Input from "../../components/input/input";
import CustomButton from "../../components/button/button";
import { Stack, Typography, Box } from "@mui/material";
import auth from "../../Service/Connection/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/Home");
      })
      .catch((error) => {
        // Tratar erro de login
        console.log(error);
      });
  };
  const estiloTexto = {
    color: "#78A55A",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "3px",
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={8}></Grid>
      </Grid>
      <div
        style={{
          borderRadius: "10%",
          backgroundColor: "rgba(217, 217, 217, 0.4)",
        }}
      >
        <form onSubmit={handleLogin} style={{ margin: "5%" }}>
          <Box textAlign="center" py={4}>
            <Typography variant="h4" component="div" style={estiloTexto}>
              {t("GF")}
            </Typography>
            <Typography variant="h7" component="div" style={estiloTexto}>
              {t("personalTrainer")}
            </Typography>
          </Box>
          <Stack spacing={2}>
            <Input
              label={t("email")}
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label={t("password")}
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomButton
              label={t("button.enter")}
              type="submit"
            ></CustomButton>
          </Stack>
        </form>
      </div>
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        margin="1%"
      >
        <SettingsOutlined sx={{ color: "#78A55A" }} />
        <Typography component="div" style={{ color: "#78A55A" }}>
          {t("byCamila")}
        </Typography>
      </Box>
    </>
  );
}

export default Login;
