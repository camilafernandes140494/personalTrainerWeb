import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BarChartIcon from '@mui/icons-material/BarChart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../Service/Connection/AuthContext';

export default function Nav(activeItems) {
  const ref = React.useRef(null);
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={2}
      >
        <BottomNavigation showLabels value={activeItems.activeItems}>
          <BottomNavigationAction
            label={t('nav.home')}
            // value="/home"
            icon={<HomeIcon />}
            component={Link}
            to="/home"
          />

          {user.uid !== 'Hq8K00ZJiKfOB987RamVa31XYTq1' && (
            <BottomNavigationAction
              label={t('nav.training')}
              icon={<FitnessCenterRoundedIcon />}
              component={Link}
              to="/training"
            />
          )}
          {user.uid !== 'Hq8K00ZJiKfOB987RamVa31XYTq1' && (
            <BottomNavigationAction
              label={t('nav.physicalAssessment')}
              icon={<BarChartIcon />}
              component={Link}
              to="/physicalAssessment"
            />
          )}
          <BottomNavigationAction
            label={t('nav.sportsNutrition')}
            icon={<RestaurantIcon />}
            component={Link}
            to="/sportsNutrition"
          />
          <BottomNavigationAction
            label={t('nav.plansPrices')}
            icon={<MonetizationOnIcon />}
            component={Link}
            to="/plansPrices"
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
