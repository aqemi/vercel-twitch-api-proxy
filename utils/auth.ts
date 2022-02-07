import axios from 'axios';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export async function getAccessToken() {
  const { data } = await axios.post<TokenResponse>('https://id.twitch.tv/oauth2/token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'client_credentials',
  });
  return data.access_token;
}
