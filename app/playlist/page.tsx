"use client";
import React, { useState, useEffect } from "react";
import {
  useInputStore,
  useAccessTokenStore,
  useSubmitButtonStore,
  usePlaylistStore,
  useLoggedInStore,
} from "../zustand-store/store";
import { getPlaylists, getUsersPlaylists } from "../api/search/playlists/route";
import { useRouter } from "next/navigation"; // For navigation
import SignIn from "../components/SignIn";
import { log } from "console";

interface Playlist {
  id: any;
  name: string;
  images: { url: string }[];
  href: string;
}

const PlaylistPage = () => {
  const { inputValue } = useInputStore();
  const { accessToken } = useAccessTokenStore();
  const { playlistUrl, setPlaylistUrl } = usePlaylistStore();
  const [searchResults, setSearchResults] = useState<Playlist[]>([]);
  const { loggedIn } = useLoggedInStore();
  const [isExpired, setIsExpired] = useState(loggedIn);
  const router = useRouter(); // Router for navigation
  const { submitValue } = useSubmitButtonStore();

  // Fetch playlists based on the search query
  const searchPlaylist = async () => {
    if (!inputValue) return; // Avoid empty search queries

    const response = await getPlaylists(accessToken || "", inputValue);
    setSearchResults(response);
  };

  // Fetch user's playlists when not searching for specific ones
  const searchUsersPlaylists = async () => {
    const response = await getUsersPlaylists(accessToken || "");
    setSearchResults(response);
  };

  const getTracksUrl = (url: string) => {
    setPlaylistUrl(url);
    localStorage.setItem("playlistUrl", url);
  };

  // Automatically trigger search when inputValue changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsExpired(localStorage.getItem("isExpired") === "true");
    }

    if (accessToken && !isExpired) {
      if (inputValue) {
        searchPlaylist(); // Search for playlists based on the query
      } else {
        searchUsersPlaylists(); // Show user playlists if no search query
      }
    }
  }, [submitValue, accessToken, isExpired]);

  const handlePlaylistClick = (playlistId: string, url: string) => {
    // Navigate to a new page where we show details of the playlist
    router.push(`/playlist/${playlistId}`); // Navigate to a dynamic playlist page
    setPlaylistUrl(url);
    getTracksUrl(url);
  };

  if (!accessToken || isExpired) {
    return <SignIn />;
  }

  // Handle case when user is not authenticated or the token is expired

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen text-white">
      <div className="container mx-auto p-6">
        <div>
        <div className="flex justify-center w-[80%] bg-black bg-opacity-90 text-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto items-center flex-col mb-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-[#1DB954] w-full">
            Your Top Playlists
          </h2>
          <p className="text-center text-gray-400">
            Here are your top playlists
          </p>
        </div>
          {searchResults &&
          searchResults.filter((playlist) => playlist !== null).length > 0 ? ( // Filter out null values
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults
                .filter((playlist) => playlist !== null) // Filter out null values
                .map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-gray-800 bg-opacity-80 text-white rounded-lg shadow-lg p-4 hover:scale-105 transform transition duration-300 cursor-pointer"
                    onClick={() =>
                      handlePlaylistClick(playlist.id, playlist.href)
                    }
                  >
                    <div className="flex flex-col items-center">
                      {playlist.images && playlist.images.length > 0 && (
                        <>
                          <img
                            src={playlist.images[0]?.url}
                            alt={playlist.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <p className="text-xl font-semibold text-center">
                            {playlist.name}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No playlists found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
