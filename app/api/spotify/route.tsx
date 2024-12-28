import fetch from 'node-fetch';

async function getSpotifyAccessToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const client_id = "a019006e595946299d4b47a15905a9ab";
    const client_secret = "5429f169188f430da347359a282a8942";
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: client_id,
    client_secret: client_secret,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (response.ok) {
      const data: any = await response.json();
        console.log('Access Token:', data.access_token);
        return data.access_token;
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Request failed', error);
  }
}
async function getAccessToken() {
    const accessToken = await getSpotifyAccessToken();
    return accessToken;
}