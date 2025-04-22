import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Settings.css';
import TikTokIcon from './r4.png';
import SnapchatIcon from './r5.png';
import MetaIcon from './r6.png';
import GeneralSettingsIcon from './qer.png';
import APIManagementIcon from './qer.png';
import MultiIcon from './qer.png';
import SecurityIcon from './qer.png';
import DExportIcon from './qer.png';
import { useCookies } from 'react-cookie';

const Settings = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState(section || 'Multi');
  const [cookies, setCookie, removeCookie] = useCookies(['csrfState', 'tiktok_token']);

  const [activeAccount, setActiveAccount] = useState(null);
  const [tiktokData, setTikTokData] = useState(() => {
    const savedData = localStorage.getItem('tiktokData');
    return savedData ? JSON.parse(savedData) : null;
  });

  const [isConnected, setIsConnected] = useState(() => {
    const savedConnections = JSON.parse(localStorage.getItem('socialConnections')) || {};
    return {
      tiktok: localStorage.getItem('tiktokConnected') === 'true' || false,
      snapchat: savedConnections.snapchat || false,
      meta: savedConnections.meta || false
    };
  });

  const [isLoading, setIsLoading] = useState({
    tiktok: false,
    snapchat: false,
    meta: false
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (section) {
      setActiveTab(section);
    }
  }, [section]);

  useEffect(() => {
    localStorage.setItem('settingsActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('tiktokConnected', isConnected.tiktok);
    if (tiktokData) {
      localStorage.setItem('tiktokData', JSON.stringify(tiktokData));
    }
  }, [isConnected.tiktok, tiktokData]);
  
  useEffect(() => {
    const connectionsToSave = {
      snapchat: isConnected.snapchat,
      meta: isConnected.meta
    };
    localStorage.setItem('socialConnections', JSON.stringify(connectionsToSave));
  }, [isConnected.snapchat, isConnected.meta]);

  const fetchTikTokUserData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, tiktok: true }));
      setError(null);
      
      const response = await fetch('https://enteneller.ru/tiktok/get_login_data/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      if (response.status === 401) {
        setIsConnected(prev => ({ ...prev, tiktok: false }));
        setTikTokData(null);
        localStorage.removeItem('tiktokData');
        localStorage.removeItem('tiktokConnected');
        removeCookie('tiktok_token', { path: '/' });
        return;
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        setTikTokData({ error: data.error || 'Failed to fetch TikTok data' });
        return;
      }
      
      setTikTokData(data);
      
      if (data.access_token) {
        setCookie('tiktok_token', data.access_token, {
          path: '/',
          maxAge: 3153600000, 
          secure: true,
          sameSite: 'strict'
        });
      }
    } catch (err) {
      console.error('Error fetching TikTok data:', err);
      setTikTokData({ error: 'Connection error' });
    } finally {
      setIsLoading(prev => ({ ...prev, tiktok: false }));
    }
  };

  useEffect(() => {
    if (isConnected.tiktok) {
      fetchTikTokUserData();
    }
  }, [isConnected.tiktok]);

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
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    if (!popup) {
      setError('Popup blocked! Please allow popups for this site.');
      setIsLoading(prev => ({ ...prev, [platform]: false }));
      return;
    }

    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        setIsLoading(prev => ({ ...prev, [platform]: false }));

        if (platform === 'tiktok' && isConnected.tiktok) {
          fetchTikTokUserData();
        }
      }
    }, 500);

    window.addEventListener('message', (event) => {
      if (event.data?.type === 'TIKTOK_AUTH') {
        clearInterval(checkPopupClosed);
        setIsConnected(prev => ({ ...prev, tiktok: true }));
        fetchTikTokUserData();
      }
    });
  };

  const handleTikTokLogin = () => {
    const csrfState = Math.random().toString(36).substring(2);
  
    setCookie('csrfState', csrfState, { 
      path: '/', 
      maxAge: 3153600000, 
      secure: true,
      sameSite: 'strict'
    });
    
    const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=sbawitneur5tk8d1gm&scope=user.info.basic&response_type=code&redirect_uri=${encodeURIComponent('https://enteneller.ru/tiktok/redirect/')}&state=${csrfState}`;
    openOAuthPopup(url, 'tiktok');
  };

  const handleSnapchatLogin = () => {
    const clientId = process.env.REACT_APP_SNAPCHAT_CLIENT_ID || 'snapchat_cli';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/snapchat`);
    const scope = encodeURIComponent('https://auth.snapchat.com/oauth2/api/user.display_name');
    const authUrl = `https://Multi.snapchat.com/Multi/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    openOAuthPopup(authUrl, 'snapchat');
  };

  const handleMetaLogin = () => {
    const clientId = process.env.REACT_APP_META_CLIENT_ID || 'meta_cli';
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
        setError('Unknown platform selected');
    }
  };

  const handleDisconnect = async (platform) => {
    if (platform === 'tiktok') {
      try {
        setIsLoading(prev => ({ ...prev, tiktok: true }));
        
        const response = await fetch('https://enteneller.ru/tiktok/logout/', {
          method: 'POST',
          credentials: 'include'
        });

        if (response.status === 401) {
          setIsConnected(prev => ({ ...prev, tiktok: false }));
          setTikTokData(null);
          localStorage.removeItem('tiktokData');
          localStorage.removeItem('tiktokConnected');
          removeCookie('tiktok_token', { path: '/' });
          return;
        }

        if (!response.ok) {
          throw new Error('Logout request failed');
        }

        setIsConnected(prev => ({ ...prev, tiktok: false }));
        setTikTokData(null);
        localStorage.removeItem('tiktokData');
        localStorage.removeItem('tiktokConnected');
        removeCookie('tiktok_token', { path: '/' });
        
        window.location.reload();
      } catch (err) {
        console.error('Error during TikTok disconnect:', err);
        setError('Failed to disconnect from TikTok');
      } finally {
        setIsLoading(prev => ({ ...prev, tiktok: false }));
      }
    } else {
      setIsConnected(prev => ({ ...prev, [platform]: false }));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/settings/${tab}`);
  };

  const renderTikTokStatus = () => {
    if (isLoading.tiktok) {
      return <span className="connected">Loading profile...</span>;
    }

    if (tiktokData?.display_name) {
      return (
        <>
          <span className="connected">Login as</span>
          <span className="APIManagement">@{tiktokData.display_name}</span>
        </>
      );
    }

    if (tiktokData?.error) {
      return <span className="connected">{tiktokData.error}</span>;
    }

    return <span className="connected">TikTok profile connected</span>;
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
            className={`menu-tab ${activeTab === 'GeneralSettings' ? 'active' : ''}`} 
            onClick={() => handleTabChange('GeneralSettings')}
          >
            {isMobile ? (
              <img src={GeneralSettingsIcon} alt="GeneralSettings" className="tab-icon" />
            ) : (
              'General Settings'
            )}
          </button>
          <button 
            className={`menu-tab ${activeTab === 'APIManagement' ? 'active' : ''}`} 
            onClick={() => handleTabChange('APIManagement')}
          >
            {isMobile ? (
              <img src={APIManagementIcon} alt="APIManagement" className="tab-icon" />
            ) : (
              'API Management'
            )}
          </button>
          <button 
            className={`menu-tab ${activeTab === 'Multi' ? 'active' : ''}`} 
            onClick={() => handleTabChange('Multi')}
          >
            {isMobile ? (
              <img src={MultiIcon} alt="Multi" className="tab-icon" />
            ) : (
              'Multi-tenancy & Authentication'
            )}
          </button>
          <button 
            className={`menu-tab ${activeTab === 'Security' ? 'active' : ''}`} 
            onClick={() => handleTabChange('Security')}
          >
            {isMobile ? (
              <img src={SecurityIcon} alt="Security" className="tab-icon" />
            ) : (
              'Security'
            )}
          </button>
          <button 
            className={`menu-tab ${activeTab === 'DExport' ? 'active' : ''}`} 
            onClick={() => handleTabChange('DExport')}
          >
            {isMobile ? (
              <img src={DExportIcon} alt="DExport" className="tab-icon" />
            ) : (
              'Data & Export'
            )}
          </button>
        </div>

        {activeTab === 'Multi' && (
          <div className="Multi-section">
            <h2>Your Connected Multi</h2>
            <p className="connection-description"></p>

            <div className="platform-buttons-vertical">
              <div id="tiktok-card" className={`platform-card ${activeAccount === 'tiktok' ? 'active' : ''}`}>  
                <div className="platform-header">
                  <img src={TikTokIcon} alt="TikTok" className="platform-icon" />
                  <span>TikTok</span>
                </div>

                {isConnected.tiktok ? (
                  <div className="connection-status" id="tiktok-connected">
                    <div className="user-greeting">
                      {renderTikTokStatus()}
                    </div>
                    <button
                      id="tiktok-logout-button"
                      onClick={() => handleDisconnect('tiktok')}
                      className="disconnect-btn"
                      disabled={isLoading.tiktok}
                    >
                      {isLoading.tiktok ? 'Disconnecting...' : 'Disconnect'}
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
          </div>
        )}

        {activeTab === 'GeneralSettings' && (
          <div className="form-section">
            <h2>General Settings</h2>
            <p>GeneralSettings </p>
          </div>
        )}

        {activeTab === 'APIManagement' && (
          <div className="form-section">
            <h2>API Management</h2>
            <p>APIManagement </p>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="form-section">
            <h2>Security</h2>
            <p>Security</p>
          </div>
        )}

        {activeTab === 'DExport' && (
          <div className="form-section">
            <h2>Data & Export</h2>
            <p>Data & Export</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;