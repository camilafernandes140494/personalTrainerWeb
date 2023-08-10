import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: '#ECEFF1',
    },
    primary: {
      main: '#60A357',
    },
    secondary: {
      main: '#D4D4D4',
    },
    text: {
      main: '#252525',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#252729',
    },
    primary: {
      main: '#2E7D32',
    },
    secondary: {
      main: '#707070',
    },
    text: {
      main: '#ECECEC',
    },
  },
});

export { lightTheme, darkTheme };
