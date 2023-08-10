import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Training from './Pages/Training/Training';
import PhysicalAssessment from './Pages/PhysicalAssessment/PhysicalAssessment';
import SportsNutrition from './Pages/SportsNutrition/SportsNutrition';
import PlansPrices from './Pages/PlansPrices/PlansPrices';
import I18nProvider from './locales/Config/I18nProvider';
import { AuthProvider } from '../src/Service/Connection/AuthContext';
import { useState } from 'react';
import { ThemeProvider, CssBaseline, Switch, Box } from '@mui/material';
import { darkTheme, lightTheme } from './Theme/theme';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <I18nProvider>
          <CssBaseline />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <LightModeOutlinedIcon color="primary" />
            <Switch checked={darkMode} onChange={handleThemeChange} />
            <DarkModeOutlinedIcon color="primary" />
          </Box>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/training" element={<Training />} />
              <Route
                path="/physicalAssessment"
                element={<PhysicalAssessment />}
              />
              <Route path="/sportsNutrition" element={<SportsNutrition />} />
              <Route path="/plansPrices" element={<PlansPrices />} />
            </Routes>
          </Router>
        </I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
