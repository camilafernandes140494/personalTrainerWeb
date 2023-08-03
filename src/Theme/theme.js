import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#78A55A",
    },
    // Defina aqui as cores do modo claro
    primary: {
      main: "#78A55A",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#787878",
    },
    // Defina aqui as cores do modo escuro
    primary: {
      main: "#364a28",
    },
  },
});

export { lightTheme, darkTheme };
