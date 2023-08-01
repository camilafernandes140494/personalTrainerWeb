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
import Nav from './Pages/Nav/Nav';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <I18nProvider>
            <Router>
              <Nav />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/training" element={<Training />} />
                <Route path="/physicalAssessment" element={<PhysicalAssessment />} />
                <Route path="/sportsNutrition" element={<SportsNutrition />} />
                <Route path="/plansPrices" element={<PlansPrices />} />
              </Routes>
            </Router>
          </I18nProvider>
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
