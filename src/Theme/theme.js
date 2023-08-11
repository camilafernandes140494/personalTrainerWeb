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
      main: '#242424',
    },
    textButton: {
      main: '#DDDDDD',
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
      main: '#006400',
    },
    secondary: {
      main: '#707070',
    },
    text: {
      main: '#DADADA',
    },
    textButton: {
      main: '#DDDDDD',
    },
  },
});

export { lightTheme, darkTheme };
