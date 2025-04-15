import React, { useState } from 'react';
import './Settings.css'; 
import TikTokIcon from './r4.png'; 
import SnapchatIcon from './r5.png';
import MetaIcon from './r6.png'; 

const Settings = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [activeAccount, setActiveAccount] = useState(null);
  const [isConnected, setIsConnected] = useState({
    tiktok: false,
    snapchat: false,
    meta: false
  });

  const handleSocialLogin = (platform) => {
    console.log(`Initiating ${platform} login...`);
    
    setTimeout(() => {
      setIsConnected(prev => ({...prev, [platform]: true}));
      setActiveAccount(platform);
      alert(`Successfully connected to ${platform}!`);
    }, 1500);
  };

  const handleDisconnect = (platform) => {
    setIsConnected(prev => ({...prev, [platform]: false}));
    alert(`Disconnected from ${platform}`);
  };

  return (
    <div className="campaign-form-container">
      <div className="form-content">
        <h4>Settings</h4>
        
        <div className="menu-tabs">
          <button 
            className={`menu-tab ${activeTab === 'password' ? 'active' : ''}`} 
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
          <button 
            className={`menu-tab ${activeTab === 'username' ? 'active' : ''}`} 
            onClick={() => setActiveTab('username')}
          >
            Change Username
          </button>
          <button 
            className={`menu-tab ${activeTab === 'accounts' ? 'active' : ''}`} 
            onClick={() => setActiveTab('accounts')}
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
              {/* TikTok Connection */}
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
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSocialLogin('tiktok')}
                    className="connect-btn"
                    style={{ backgroundColor: '#000000', color: 'white' }}
                  >
                    Connect Account
                  </button>
                )}
              </div>
              
              {/* Snapchat Connection */}
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
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSocialLogin('snapchat')}
                    className="connect-btn"
                    style={{ backgroundColor: '#FFB700', color: 'white' }}
                  >
                    Connect Account
                  </button>
                )}
              </div>
              
              {/* Meta Connection */}
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
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSocialLogin('meta')}
                    className="connect-btn"
                    style={{ backgroundColor: '#1877F2', color: 'white' }}
                  >
                    Connect Account
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
                    <button className="quick-login" style={{ backgroundColor: '#000000' }}>
                      <img src={TikTokIcon} alt="Login with TikTok" />
                      Login with TikTok
                    </button>
                  )}
                  {isConnected.snapchat && (
                    <button className="quick-login" style={{ backgroundColor: '#FFB700' }}>
                      <img src={SnapchatIcon} alt="Login with Snapchat" />
                      Login with Snapchat
                    </button>
                  )}
                  {isConnected.meta && (
                    <button className="quick-login" style={{ backgroundColor: '#1877F2' }}>
                      <img src={MetaIcon} alt="Login with Meta" />
                      Login with Meta
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
            <p>Password change form would appear here</p>
          </div>
        )}

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