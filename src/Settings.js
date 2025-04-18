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
  const [tiktokName, setTikTokName] = useState('');

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

  // Persist selected tab
  useEffect(() => {
    localStorage.setItem('settingsActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
	fetch('https://enteneller.ru/tiktok/get_login_data/')
	  .then((res) => res.json())
	  .then((data) => 
	  {
		if (data['display_name']) 
		{
			setIsConnected((prev) => ({ ...prev, tiktok: true }));
		}
	  })
	  .finally(() => {
		setIsLoading((prev) => ({ ...prev, tiktok: false }));
	  });
  }, []);
          

  // Load connection state from localStorage
  useEffect(() => {
    try {
      const savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || {};
      setIsConnected((prev) => ({ ...prev, ...savedConnections }));
    } catch (err) {
      console.error('Error reading connections from localStorage:', err);
      setError('Failed to load connection status');
    }
  }, []);

  const openOAuthPopup = (url, platform) => {
    setIsLoading((prev) => ({ ...prev, [platform]: true }));
    setError(null);

    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
      url,
      `${platform}OAuth`,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    if (!popup) {
      setError('Popup blocked! Please allow popups for this site.');
      setIsLoading((prev) => ({ ...prev, [platform]: false }));
      return;
    }

    window.addEventListener('message', (event) => 
	{
      if (event.data?.type === 'TIKTOK_AUTH') 
	  {
		  window.location.reload();
      }
    });
  };

  // ----- OAuth handlers -----
  const handleTikTokLogin = () => {
    const csrfState = Math.random().toString(36).substring(2);

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += '?client_key=' + 'sbawitneur5tk8d1gm';
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += '&redirect_uri=' + encodeURIComponent('https://enteneller.ru/tiktok/redirect/');
    url += '&state=' + csrfState;

    openOAuthPopup(url, 'tiktok');
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
    switch (platform) {
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
      setIsConnected((prev) => ({ ...prev, [platform]: false }));
      if (platform === 'tiktok') setTikTokName('');
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

  const handleTabChange = (tab) => setActiveTab(tab);

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

        {/* Tabs */}
        <div className="menu-tabs">
          <button className={`menu-tab ${activeTab === 'password' ? 'active' : ''}`} onClick={() => handleTabChange('password')}>
            Change Password
          </button>
          <button className={`menu-tab ${activeTab === 'username' ? 'active' : ''}`} onClick={() => handleTabChange('username')}>
            Change Username
          </button>
          <button className={`menu-tab ${activeTab === 'accounts' ? 'active' : ''}`} onClick={() => handleTabChange('accounts')}>
            Connected Accounts
          </button>
        </div>

        {activeTab === 'accounts' && (
          <div className="accounts-section">
            <h2>Your Connected Accounts</h2>
            <p className="connection-description">Connect your social media accounts to enable quick login and sharing capabilities.</p>

            {/* Platform cards */}
            <div className="platform-buttons-vertical">
              {/* --- TikTok card --- */}
              <div id="tiktok-card" className={`platform-card ${activeAccount === 'tiktok' ? 'active' : ''}`}>  
                <div className="platform-header">
                  <img src={TikTokIcon} alt="TikTok" className="platform-icon" />
                  <span>TikTok</span>
                </div>

                {isConnected.tiktok ? (
                  <div className="connection-status" id="tiktok-connected">
                    <span className="connected">Logged in as {tiktokName || 'TikTok User'}</span>
                    <button
                      id="tiktok-logout-button"
                      onClick={() => handleDisconnect('tiktok')}
                      className="disconnect-btn"
                      disabled={isLoading.tiktok}
                    >
                      {isLoading.tiktok ? 'Processing...' : 'Logout'}
                    </button>
                  </div>
                ) : (
                  <button
                    id="tiktok-login-button"
                    onClick={() => handleSocialLogin('tiktok')}
                    className="connect-btn"
                    style={{ backgroundColor: '#000000', color: 'white' }}
                    disabled={isLoading.tiktok}
                  >
                    {isLoading.tiktok ? 'Connecting...' : 'Connect Account'}
                  </button>
                )}
              </div>

              {/* --- Snapchat card --- */}
              <div className={`platform-card ${activeAccount === 'snapchat' ? 'active' : ''}`}>
                <div className="platform-header">
                  <img src={SnapchatIcon} alt="Snapchat" className="platform-icon" />
                  <span>Snapchat</span>
                </div>
                {isConnected.snapchat ? (
                  <div className="connection-status">
                    <span className="connected">Connected</span>
                    <button onClick={() => handleDisconnect('snapchat')} className="disconnect-btn" disabled={isLoading.snapchat}>
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

              {/* --- Meta card --- */}
              <div className={`platform-card ${activeAccount === 'meta' ? 'active' : ''}`}>
                <div className="platform-header">
                  <img src={MetaIcon} alt="Meta" className="platform-icon" />
                  <span>Meta</span>
                </div>
                {isConnected.meta ? (
                  <div className="connection-status">
                    <span className="connected">Connected</span>
                    <button onClick={() => handleDisconnect('meta')} className="disconnect-btn" disabled={isLoading.meta}>
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

            {/* Quick login buttons */}
            {Object.values(isConnected).some((val) => val) && (
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

        {/* ----- Password tab ----- */}
        {activeTab === 'password' && (
          <div className="form-section">
            <h2>Change Password</h2>
            <p>Password change form would appear here</p>
          </div>
        )}

        {/* ----- Username tab ----- */}
        {activeTab === 'username' && (
          <div className="form-section">
            <h2>Change Username</h2>
            <p>Username change form would appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
