export async function exchangeCodeForToken(authCode) {
    const clientKey = 'sbawitneur5tk8d1gm';
    const clientSecret = 'CskyxxBpyjloqvz89LwxagXfvRrFlF6n';
    const redirectUri = 'https://dizzylemon.vercel.app/dashboard';
  
    const tokenUrl = 'https://open.tiktokapis.com/v2/oauth/token/';
  
    const payload = {
      client_key: clientKey,
      client_secret: clientSecret,
      code: authCode,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    };
  
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      console.log('Access Token Response:', data);
  
      if (data.access_token) {
        return data.access_token;
      } else {
        console.error(' Ошибка получения access_token:', data);
        return null;
      }
    } catch (error) {
      console.error(' Ошибка запроса:', error);
      return null;
    }
  }
  
  export function checkForAuthCode() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }
  
  export function getTikTokAuthUrl() {
    const clientKey = 'sbawitneur5tk8d1gm';
    const redirectUri = encodeURIComponent('https://dizzylemon.vercel.app/dashboard');
    const scopes = encodeURIComponent('user.info.basic,video.list');
    
    return `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&scope=${scopes}&response_type=code&redirect_uri=${redirectUri}`;
  }