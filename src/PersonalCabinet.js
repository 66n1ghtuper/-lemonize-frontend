import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './PersonalCabinet.css';
import userAvatar from './gg.png';

const PersonalCabinet = ({ userName, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path) => {
    return location.pathname.startsWith(`/${path}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    onLogout();
    navigate('/login');
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
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
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="lkabin-modal-overlay">
          <div className="lkabin-modal">
            <div className="lkabin-modal-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="lkabin-modal-body">
              <p>Are you sure you want to exit your account?</p>
            </div>
            <div className="lkabin-modal-buttons">
              <button 
                onClick={closeLogoutModal} 
                className="lkabin-modal-cancel"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout} 
                className="lkabin-modal-confirm"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="lkabin-sidebar">
        <div className="lkabin-user-info">
          <div className="lkabin-avatar-container">
            <img src={userAvatar} alt="User Avatar" className="lkabin-user-avatar" />
          </div>
          <h3 className="lkabin-welcome-title">Welcome</h3>
          <p className="lkabin-username">{userName || 'User'}</p>
          <button onClick={openLogoutModal} className="lkabin-logout-btn">
            <span>Exit</span>
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