import { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { Method } from 'axios';
import { getAccessToken } from '../utils/auth';

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const { path, ...params } = req.query;
    const accessToken = await getAccessToken();
    const { data, status } = await axios.request({
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': process.env.CLIENT_ID!,
      },
      method: req.method as Method,
      url: `https://api.twitch.tv/helix/${path}`,
      params,
      data: req.body,
      responseType: 'stream',
      validateStatus: () => true,
    });
    res.status(status);
    data.pipe(res);
  } catch (err: any) {
    console.error('Error on proxy request', err);
    res.status(err?.response.status ?? 500);
    res.send(err.message);
  }
}
