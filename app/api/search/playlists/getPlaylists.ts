import { NextApiRequest, NextApiResponse } from "next";

// pages/api/getPlaylists.ts
export async function getPlaylistsApi(token: string, search: string) {
  const url = `https://api.spotify.com/v1/search?q=${search}&type=playlist&limit=10`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching playlists: ${response.status}`);
    }

    const data = await response.json();
    return data.playlists.items;
  } catch (error) {
    console.error("Error in getPlaylists:", error);
    throw new Error("Failed to fetch playlists");
  }
}
