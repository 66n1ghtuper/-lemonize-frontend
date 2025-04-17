import React, { useState, useEffect } from 'react';
import './Settings.css';
import TikTokIcon from './r4.png';
import SnapchatIcon from './r5.png';
import MetaIcon from './r6.png';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('settingsActiveTab');
    return savedTab || 'accounts';
  });
  
  const [activeAccount, setActiveAccount] = useState(null);
  const [isConnected, setIsConnected] = useState({
    tiktok: false,
    snapchat: false,
    meta: false
  });
  const [isLoading, setIsLoading] = useState({
    tiktok: false,
    snapchat: false,
    meta: false
  });
  const [error, setError] = useState(null);
  

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  

  const [usernameData, setUsernameData] = useState({
    newUsername: '',
    currentPassword: ''
  });
  const [usernameErrors, setUsernameErrors] = useState({});
  const [usernameSuccess, setUsernameSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('settingsActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const checkConnections = () => {
      try {
        const savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || {};
        setIsConnected(prev => ({
          ...prev,
          ...savedConnections
        }));
      } catch (err) {
        console.error('Error reading connections from localStorage:', err);
        setError('Failed to load connection status');
      }
    };
    
    checkConnections();
  }, []);


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    

    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    let isValid = true;
    
    if (!passwordData.currentPassword.trim()) {
      errors.currentPassword = 'Current password is required';
      isValid = false;
    }
    
    if (!passwordData.newPassword.trim()) {
      errors.newPassword = 'New password is required';
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setPasswordErrors(errors);
    return isValid;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordSuccess(false);
    
    if (validatePasswordForm()) {

      setIsLoading(prev => ({ ...prev, password: true }));
      
      setTimeout(() => {
        setIsLoading(prev => ({ ...prev, password: false }));
        setPasswordSuccess(true);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        

        setTimeout(() => setPasswordSuccess(false), 3000);
      }, 1500);
    }
  };


  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setUsernameData(prev => ({
      ...prev,
      [name]: value
    }));
    

    if (usernameErrors[name]) {
      setUsernameErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateUsernameForm = () => {
    const errors = {};
    let isValid = true;
    
    if (!usernameData.newUsername.trim()) {
      errors.newUsername = 'New username is required';
      isValid = false;
    } else if (usernameData.newUsername.length < 3) {
      errors.newUsername = 'Username must be at least 3 characters';
      isValid = false;
    }
    
    if (!usernameData.currentPassword.trim()) {
      errors.currentPassword = 'Password is required';
      isValid = false;
    }
    
    setUsernameErrors(errors);
    return isValid;
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setUsernameSuccess(false);
    
    if (validateUsernameForm()) {

      setIsLoading(prev => ({ ...prev, username: true }));
      
      setTimeout(() => {
        setIsLoading(prev => ({ ...prev, username: false }));
        setUsernameSuccess(true);
        setUsernameData(prev => ({
          ...prev,
          currentPassword: ''
        }));
        

        setTimeout(() => setUsernameSuccess(false), 3000);
      }, 1500);
    }
  };


  const openOAuthPopup = (url, platform) => {
    setIsLoading(prev => ({ ...prev, [platform]: true }));
    setError(null);
    
    const width = 600;
    const height = 700; 
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const popup = window.open(
      url,
      `${platform}OAuth`,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=yes, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );

    if (!popup) {
      setError('Popup blocked! Please allow popups for this site.');
      setIsLoading(prev => ({ ...prev, [platform]: false }));
      return;
    }

    const messageListener = (event) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'oauth-success' && event.data.platform === platform) {
        setIsConnected(prev => ({...prev, [platform]: true}));
        setActiveAccount(platform);
        
        try {
          const savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || {};
          savedConnections[platform] = true;
          localStorage.setItem('socialConnections', JSON.stringify(savedConnections));
        } catch (err) {
          console.error('Error saving to localStorage:', err);
          setError('Failed to save connection');
        }
        
        popup.close();
        window.removeEventListener('message', messageListener);
        setIsLoading(prev => ({ ...prev, [platform]: false }));
      } else if (event.data.type === 'oauth-error') {
        setError(`Failed to connect with ${platform}: ${event.data.message}`);
        setIsLoading(prev => ({ ...prev, [platform]: false }));
        window.removeEventListener('message', messageListener);
      }
    };

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        window.removeEventListener('message', messageListener);
        setIsLoading(prev => ({ ...prev, [platform]: false }));
      }
    }, 500);

    window.addEventListener('message', messageListener);
  };

  const handleTikTokLogin = () => {
    const clientId = process.env.REACT_APP_TIKTOK_CLIENT_ID || 'sbawitneur5tk8d1gm';
    const redirectUri = 'https://enteneller.ru/redirect.php';
    const state = 'tiktok_' + Math.random().toString(36).substring(2);
    
    const authUrl = `https://www.tiktok.com/auth/authorize?client_key=${clientId}&scope=user.info.basic&response_type=code&redirect_uri=${redirectUri}&state=${state}`;
    
    openOAuthPopup(authUrl, 'tiktok');
  };

  const handleSnapchatLogin = () => {
    const clientId = process.env.REACT_APP_SNAPCHAT_CLIENT_ID || 'snapchat cli';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/snapchat`);
    const scope = encodeURIComponent('https://auth.snapchat.com/oauth2/api/user.display_name');
    
    const authUrl = `https://accounts.snapchat.com/accounts/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
    openOAuthPopup(authUrl, 'snapchat');
  };

  const handleMetaLogin = () => {
    const clientId = process.env.REACT_APP_META_CLIENT_ID || 'meta cli';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/meta`);
    const scope = encodeURIComponent('public_profile,email');
    
    const authUrl = `https://www.facebook.com/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    
    openOAuthPopup(authUrl, 'meta');
  };

  const handleSocialLogin = (platform) => {
    switch(platform) {
      case 'tiktok':
        handleTikTokLogin();
        break;
      case 'snapchat':
        handleSnapchatLogin();
        break;
      case 'meta':
        handleMetaLogin();
        break;
      default:
        console.error('Unknown platform');
        setError('Unknown platform selected');
    }
  };

  const handleDisconnect = (platform) => {
    if (window.confirm(`Are you sure you want to disconnect ${platform}?`)) {
      setIsConnected(prev => ({...prev, [platform]: false}));
      setActiveAccount(null);
      
      try {
        const savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || {};
        delete savedConnections[platform];
        localStorage.setItem('socialConnections', JSON.stringify(savedConnections));
      } catch (err) {
        console.error('Error removing from localStorage:', err);
        setError('Failed to disconnect');
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
    setPasswordSuccess(false);
    setUsernameSuccess(false);
  };

  return (
    <div className="campaign-form-container">
      <div className="form-content">
        <h4>Settings</h4>
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="close-error">
              &times;
            </button>
          </div>
        )}
        
        <div className="menu-tabs">
          <button 
            className={`menu-tab ${activeTab === 'password' ? 'active' : ''}`} 
            onClick={() => handleTabChange('password')}
          >
            Change Password
          </button>
          <button 
            className={`menu-tab ${activeTab === 'username' ? 'active' : ''}`} 
            onClick={() => handleTabChange('username')}
          >
            Change Username
          </button>
          <button 
            className={`menu-tab ${activeTab === 'accounts' ? 'active' : ''}`} 
            onClick={() => handleTabChange('accounts')}
          >
            Connected Accounts
          </button>
        </div>

        {activeTab === 'accounts' && (
          <div className="accounts-section">
            <h2>Your Connected Accounts</h2>
            <p className="connection-description">
              Connect your social media accounts to enable quick login and sharing capabilities.
            </p>
            
            <div className="platform-buttons-vertical">
              <div className={`platform-card ${activeAccount === 'tiktok' ? 'active' : ''}`}>
                <div className="platform-header">
                  <img src={TikTokIcon} alt="TikTok" className="platform-icon" />
                  <span>TikTok</span>
                </div>
                {isConnected.tiktok ? (
                  <div className="connection-status">
                    <span className="connected">Connected</span>
                    <button 
                      onClick={() => handleDisconnect('tiktok')}
                      className="disconnect-btn"
                      disabled={isLoading.tiktok}
                    >
                      {isLoading.tiktok ? 'Processing...' : 'Disconnect'}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSocialLogin('tiktok')}
                    className="connect-btn"
                    style={{ backgroundColor: '#000000', color: 'white' }}
                    disabled={isLoading.tiktok}
                  >
                    {isLoading.tiktok ? 'Connecting...' : 'Connect Account'}
                  </button>
                )}
              </div>
              
              <div className={`platform-card ${activeAccount === 'snapchat' ? 'active' : ''}`}>
                <div className="platform-header">
                  <img src={SnapchatIcon} alt="Snapchat" className="platform-icon" />
                  <span>Snapchat</span>
                </div>
                {isConnected.snapchat ? (
                  <div className="connection-status">
                    <span className="connected">Connected</span>
                    <button 
                      onClick={() => handleDisconnect('snapchat')}
                      className="disconnect-btn"
                      disabled={isLoading.snapchat}
                    >
                      {isLoading.snapchat ? 'Processing...' : 'Disconnect'}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSocialLogin('snapchat')}
                    className="connect-btn"
                    style={{ backgroundColor: '#FFB700', color: 'white' }}
                    disabled={isLoading.snapchat}
                  >
                    {isLoading.snapchat ? 'Connecting...' : 'Connect Account'}
                  </button>
                )}
              </div>
  
              <div className={`platform-card ${activeAccount === 'meta' ? 'active' : ''}`}>
                <div className="platform-header">
                  <img src={MetaIcon} alt="Meta" className="platform-icon" />
                  <span>Meta</span>
                </div>
                {isConnected.meta ? (
                  <div className="connection-status">
                    <span className="connected">Connected</span>
                    <button 
                      onClick={() => handleDisconnect('meta')}
                      className="disconnect-btn"
                      disabled={isLoading.meta}
                    >
                      {isLoading.meta ? 'Processing...' : 'Disconnect'}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSocialLogin('meta')}
                    className="connect-btn"
                    style={{ backgroundColor: '#1877F2', color: 'white' }}
                    disabled={isLoading.meta}
                  >
                    {isLoading.meta ? 'Connecting...' : 'Connect Account'}
                  </button>
                )}
              </div>
            </div>
            
            {Object.values(isConnected).some(val => val) && (
              <div className="login-option">
                <h3>Quick Login Options</h3>
                <p>You can now log in using your connected accounts:</p>
                <div className="quick-login-buttons">
                  {isConnected.tiktok && (
                    <button 
                      className="quick-login" 
                      style={{ backgroundColor: '#000000' }}
                      onClick={() => handleSocialLogin('tiktok')}
                      disabled={isLoading.tiktok}
                    >
                      <img src={TikTokIcon} alt="Login with TikTok" />
                      {isLoading.tiktok ? 'Logging in...' : 'Login with TikTok'}
                    </button>
                  )}
                  {isConnected.snapchat && (
                    <button 
                      className="quick-login" 
                      style={{ backgroundColor: '#FFB700' }}
                      onClick={() => handleSocialLogin('snapchat')}
                      disabled={isLoading.snapchat}
                    >
                      <img src={SnapchatIcon} alt="Login with Snapchat" />
                      {isLoading.snapchat ? 'Logging in...' : 'Login with Snapchat'}
                    </button>
                  )}
                  {isConnected.meta && (
                    <button 
                      className="quick-login" 
                      style={{ backgroundColor: '#1877F2' }}
                      onClick={() => handleSocialLogin('meta')}
                      disabled={isLoading.meta}
                    >
                      <img src={MetaIcon} alt="Login with Meta" />
                      {isLoading.meta ? 'Logging in...' : 'Login with Meta'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'password' && (
          <div className="form-section">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="settings-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.currentPassword ? 'error' : ''}
                />
                {passwordErrors.currentPassword && (
                  <span className="error-message">{passwordErrors.currentPassword}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.newPassword ? 'error' : ''}
                />
                {passwordErrors.newPassword && (
                  <span className="error-message">{passwordErrors.newPassword}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.confirmPassword ? 'error' : ''}
                />
                {passwordErrors.confirmPassword && (
                  <span className="error-message">{passwordErrors.confirmPassword}</span>
                )}
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading.password}
              >
                {isLoading.password ? 'Updating...' : 'Update Password'}
              </button>
              
              {passwordSuccess && (
                <div className="success-message">
                  Password updated successfully!
                </div>
              )}
            </form>
          </div>
        )}

        {activeTab === 'username' && (
          <div className="form-section">
            <h2>Change Username</h2>
            <form onSubmit={handleUsernameSubmit} className="settings-form">
              <div className="form-group">
                <label htmlFor="newUsername">New Username</label>
                <input
                  type="text"
                  id="newUsername"
                  name="newUsername"
                  value={usernameData.newUsername}
                  onChange={handleUsernameChange}
                  className={usernameErrors.newUsername ? 'error' : ''}
                />
                {usernameErrors.newUsername && (
                  <span className="error-message">{usernameErrors.newUsername}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={usernameData.currentPassword}
                  onChange={handleUsernameChange}
                  className={usernameErrors.currentPassword ? 'error' : ''}
                />
                {usernameErrors.currentPassword && (
                  <span className="error-message">{usernameErrors.currentPassword}</span>
                )}
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading.username}
              >
                {isLoading.username ? 'Updating...' : 'Update Username'}
              </button>
              
              {usernameSuccess && (
                <div className="success-message">
                  Username updated successfully!
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;