import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './PersonalCabinet.css';
import userAvatar from './gg.png';

const PersonalCabinet = ({ userName, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname.startsWith(`/${path}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    onLogout();
    navigate('/login');
  };

  const menuItems = [
    { path: 'dashboard', name: 'Dashboard' },
    { path: 'create-company', name: 'Create Company' },
    { path: 'campaign-actions', name: 'Campaign Actions' },
    { path: 'payments-getaway', name: 'Payments' },
    { path: 'settings', name: 'Settings' }
  ];

  return (
    <div className="lkabin">
      <aside className="lkabin-sidebar">
        <div className="lkabin-user-info">
          <div className="lkabin-avatar-container">
            <img src={userAvatar} alt="User Avatar" className="lkabin-user-avatar" />
          </div>
          <h3 className="lkabin-welcome-title">Welcome</h3>
          <p className="lkabin-username">{userName || 'Пользователь'}</p>
          <button onClick={handleLogout} className="lkabin-logout-btn">
          Exit
          </button>
        </div>

        <nav className="lkabin-main-menu">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path} className={isActive(item.path) ? 'active' : ''}>
                <Link to={item.path}>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="lkabin-content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default PersonalCabinet;