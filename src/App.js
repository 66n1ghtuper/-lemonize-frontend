import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PersonalCabinet from './PersonalCabinet';
import Dashboard from './Dashboard';
import CreateCompany from './CreateCompany';
import Settings from './Settings';
import CampaignActions from './CampaignActions';
import Payments from './Payments';
import Registration from './Registration';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('Пользователь');
  const [initialPath, setInitialPath] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const name = localStorage.getItem('userName') || 'Пользователь';
    const lastPath = localStorage.getItem('lastPath');
    
    setIsAuthenticated(auth);
    setUserName(name);
    
   
    if (auth && lastPath) {
      setInitialPath(lastPath);
    }
  }, []);

  function PathTracker() {
    const location = useLocation();
    
    useEffect(() => {
      
      if (isAuthenticated && location.pathname !== '/login') {
        localStorage.setItem('lastPath', location.pathname);
      }
    }, [location, isAuthenticated]);
    
    return null;
  }

  return (
    <Router>
      <PathTracker />
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to={initialPath || '/dashboard'} /> : 
              <Registration 
                onLoginSuccess={() => {
                  setIsAuthenticated(true);
                  setUserName(localStorage.getItem('userName'));
                }}
              />
          } 
        />
        
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <PersonalCabinet 
                userName={userName} 
                onLogout={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem('lastPath');
                }}
              /> : 
              <Navigate to="/login" />
          }
        >
          <Route index element={<Navigate to={initialPath || '/dashboard'} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-company" element={<CreateCompany />} />
          <Route path="settings" element={<Settings />} />
          <Route path="campaign-actions" element={<CampaignActions />} />
          <Route path="payments-getaway" element={<Payments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;