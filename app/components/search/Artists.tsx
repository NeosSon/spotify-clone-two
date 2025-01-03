"use client";
import { getArtist } from "@/app/api/search/artists/route";
import { getSpotifyAccessToken } from "@/app/api/spotify-token/route";
import { useInputStore } from "@/app/zustand-store/store";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter

const Artists = () => {
  const { inputValue } = useInputStore();
  const [listOfArtists, setListOfArtists] = useState([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    async function getArtistFromApi() {
      try {
        const accessToken = await getSpotifyAccessToken();
        const artist = await getArtist(accessToken, inputValue);

        if (!artist) {
          return undefined;
        }
        setListOfArtists(artist.items);
      } catch (error) {
        return undefined;
      }
    }
    getArtistFromApi();
  }, [inputValue]);

  const handleViewClick = (artistId: string) => {
    // Navigate to the artist's detailed page (you'd need to create this page first)
    router.push(`/artist/${artistId}`);
  };

  return (
    <div className="bg-black text-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#1DB954]">Spotify Artist Search</h2>
      <ul className="space-y-4">
        {listOfArtists && inputValue ? (
          listOfArtists.map((artist: any) => (
            <li
              key={artist.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-[#1DB954] transition duration-200 ease-in-out"
            >
              <span className="text-lg font-semibold">{artist.name}</span>
              <button
                onClick={() => handleViewClick(artist.id)} // Add onClick handler
                className="text-[#1DB954] hover:text-white transition duration-300 ease-in-out"
              >
                View
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400">Search for an artist</li>
        )}
      </ul>
    </div>
  );
};

export default Artists;
