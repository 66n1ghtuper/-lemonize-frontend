import React, { useState } from 'react';
import './Settings.css'; 


import TikTokIcon from './r4.png'; 
import SnapchatIcon from  './r5.png';
import MetaIcon from './r6.png'; 

const Settings = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [activeAccount, setActiveAccount] = useState(null);

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
            <div className="platform-buttons">
              <button 
                className={`platform-button ${activeAccount === 'tiktok' ? 'active' : ''}`} 
                onClick={() => setActiveAccount('tiktok')}
                style={{ borderColor: '#000000', backgroundColor: activeAccount === 'tiktok' ? '#000000' : 'rgba(255, 255, 255, 0.15)', color: activeAccount === 'tiktok' ? 'white' : '#000000' }}
              >
                <img src={TikTokIcon} alt="TikTok" className="platform-icon" />
                TikTok
              </button>
              
              <button 
                className={`platform-button ${activeAccount === 'snapchat' ? 'active' : ''}`} 
                onClick={() => setActiveAccount('snapchat')}
                style={{ borderColor: '#FFB700', backgroundColor: activeAccount === 'snapchat' ? '#FFB700' : 'rgba(255, 255, 255, 0.15)', color: activeAccount === 'snapchat' ? 'white' : '#FFB700' }}
              >
                <img src={SnapchatIcon} alt="Snapchat" className="platform-icon" />
                Snapchat
              </button>
              
              <button 
                className={`platform-button ${activeAccount === 'meta' ? 'active' : ''}`} 
                onClick={() => setActiveAccount('meta')}
                style={{ borderColor: '#1877F2', backgroundColor: activeAccount === 'meta' ? '#1877F2' : 'rgba(255, 255, 255, 0.15)', color: activeAccount === 'meta' ? 'white' : '#1877F2' }}
              >
                <img src={MetaIcon} alt="Meta" className="platform-icon" />
                Meta
              </button>
            </div>
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
