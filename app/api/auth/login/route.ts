import { env } from '@/env.mts';
import { NextResponse } from 'next/server';
import querystring from 'querystring';

const client_id = env.NEXT_PUBLIC_CLIENTID; // Replace with your Spotify client ID
const redirect_uri = 'http://localhost:3000/auth/callback'; // Update with your callback route

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-email',
  'user-read-private',
  'user-library-modify',
  'user-library-read',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-recently-played',
  'user-top-read',
].join(' ');

export async function GET() {
  const state = Math.random().toString(36).substring(2, 15); // Generate random state

  const spotifyAuthUrl =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope: scopes,
      redirect_uri,
      state,
    });

  return NextResponse.redirect(spotifyAuthUrl);
}
