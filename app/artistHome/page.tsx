"use client";
import { getArtist } from "@/app/api/search/artists/route";
import { getSpotifyAccessToken } from "@/app/api/spotify-token/route";
import {
  useAccessTokenStore,
  useInputStore,
  usePlayerStore,
} from "@/app/zustand-store/store";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import WelcomeMessage from "../components/WelcomeMessage";

const Artists = () => {
  const { inputValue } = useInputStore();
  const [listOfArtists, setListOfArtists] = useState([]);
  const router = useRouter(); // Initialize the router
  const playTrack = usePlayerStore((state) => state.playTrack);
  const { accessToken } = useAccessTokenStore();
  const isExpired = localStorage.getItem("isExpired") === "true";

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
    if (isExpired) {
      return;
    }
    getArtistFromApi();
  }, [inputValue]);

  const handleViewClick = (artistId: string) => {
    // Navigate to the artist's detailed page (you'd need to create this page first)
    router.push(`/artists/${artistId}`);
  };

  if (!accessToken || isExpired) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Please Sign In</div>
      </div>
    );
  }

  return (
  <div className={`bg-black text-white rounded-lg shadow-lg p-6 mx-auto w-screen  ${
    listOfArtists.length === 0 && !inputValue
      ? "bg-gradient-to-r from-[#1DB954] to-[#1DB954] bg-opacity-30 h-screen"
      : "bg-opacity-100"
  }`}>
      <h2 className="text-3xl font-bold mb-4 text-center text-[#1DB954]">
        Spotify Artist Search
      </h2>
      <div>
        {listOfArtists.length === 0 && !inputValue && (
          <WelcomeMessage
            title="Welcome to Artists Search!"
            bio="Start by searching for your favorite artists."
            ending="Start Searching"
          />
        )}
      </div>
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
          null
        )}
      </ul>
    </div>
  );
};

export default Artists;
