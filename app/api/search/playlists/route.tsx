// Code to fetch playlists from Spotify API

import { getPlaylistsApi } from "./getPlaylists";
import { getPlaylistTracksApi } from "./getPlaylistTracks";
import { fetchUserPlaylists } from "./getUsersPlaylists";

export const getPlaylists = async (token: string, search: string) => {
  try {
    const data = await getPlaylistsApi(token, search);

    return data; // Return the list of playlists
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return null;
  }
};

export const getUsersPlaylists = async (token: string) => {
  try {
    const response = await fetchUserPlaylists(
      token,
      "https://api.spotify.com/v1/me/playlists"
    );

    const data = await response.json();
    console.log("data:", data);
    return data; // Return the user's playlists
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    return null;
  }
};

export const getPlaylistTracks = async (token: string, url: string) => {
  try {
    const data = await getPlaylistTracksApi(token, url);

    return data; // Return the playlist tracks
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    return null;
  }
};
