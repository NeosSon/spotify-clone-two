import { NextApiRequest, NextApiResponse } from "next";

// Function to fetch playlist tracks
export async function getPlaylistTracksApi(token: string, url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching playlist tracks: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getPlaylistTracks:", error);
    throw new Error("Failed to fetch playlist tracks");
  }
}


