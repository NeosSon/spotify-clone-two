"use client";
import { getTracks, getTracksByIdOrName } from "@/app/api/search/tracks/route";

import React, { useEffect, useState } from "react";
import {
  useAccessTokenStore,
  useInputStore,
  usePlayerStore,
  useSubmitButtonStore,
} from "@/app/zustand-store/store";
import { Card, CardContent } from "@/components/ui/card";
import SpotifyPlayer from "react-spotify-web-playback";
import WelcomeMessage from "../components/WelcomeMessage"; // Import the WelcomeMessage component

const Tracks = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { inputValue } = useInputStore();
  const { setSubmitValue, submitValue } = useSubmitButtonStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { currentTrack, isPlaying, pauseTrack } = usePlayerStore();
  const playTheTrack = usePlayerStore((state) => state.playTrack);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsExpired(localStorage.getItem("isExpired") === "true");
    }
  }, []);

  const fetchTrackData = async () => {
    setIsLoading(true);
    try {
      const token = accessToken;

      const tracks = await getTracks(token || "", inputValue);

      if (tracks?.items?.length) {
        const songsMapped = tracks.items.map((track: any) => ({
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          id: track.id,
          uri: track.uri,
          image: track.album.images[0]?.url || "",
        }));

        const detailedTracks = [];
        for (const track of songsMapped) {
          try {
            const trackData = await getTracksByIdOrName(
              token || "",
              track.name
            );

            if (trackData && trackData.album && trackData.album.images) {
              detailedTracks.push({
                ...track,
                image: trackData.album.images[0]?.url || track.image,
              });
            } else {
              detailedTracks.push(track);
            }
          } catch (error) {
            console.error("Error fetching track details:", error);
            detailedTracks.push(track);
          }
        }

        setSearchResults(detailedTracks.length ? detailedTracks : songsMapped);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isExpired) {
      return;
    }
    setIsClient(true);
    if (inputValue) {
      fetchTrackData();
    }
    setSubmitValue(false);
  }, [submitValue]);

  const playTrack = (trackUri: string) => {
    if (currentTrack === trackUri && isPlaying) {
      pauseTrack();
    } else {
      playTheTrack(trackUri);
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }
  if (!accessToken || isExpired) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Please Sign In</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-screen ${searchResults.length === 0 && "h-screen"}`}>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader">Loading tracks...</div>
        </div>
      ) : (
        <>
          <div className="flex justify-center w-full">
            <div
              className={`
    w-screen 
    bg-black 
    text-white 
    rounded-lg 
    shadow-lg 
    p-6 
    mx-auto 
    items-center 
    flex-col 
    
    ${
      searchResults.length === 0
        ? "bg-gradient-to-r from-[#1DB954] to-[#1DB954] bg-opacity-30 min-h-screen "
        : "bg-opacity-100"
    }
  `}
            >
              <h2 className="text-3xl font-bold mb-4 text-center text-[#1DB954] w-full">
                Spotify Track Search
              </h2>

              {/* No tracks found / Welcome message */}
              {searchResults.length === 0 && (
                <WelcomeMessage
                  title="Welcome to Tracks Search!"
                  bio="Start by searching for your favorite tracks. We'll help you find the best music."
                  ending="Start Searching"
                />
              )}
            </div>
          </div>

          {/* Show tracks */}
          <div className="flex flex-wrap justify-center gap-6 w-full mt-4">
            {searchResults.map((track: any, index: number) => (
              <Card
                key={index}
                className="p-4 bg-gray-800 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-full sm:w-80 md:w-72 lg:w-64"
              >
                <CardContent>
                  <div className="flex flex-col items-center">
                    <img
                      src={track.image}
                      alt={track.name}
                      className="rounded-lg w-full h-40 object-cover "
                    />
                    <h2 className="text-lg font-semibold">{track.name}</h2>
                    <p className="text-sm text-gray-400">{track.artist}</p>
                    <p className="text-sm text-gray-500">{track.album}</p>
                    <button
                      onClick={() => playTrack(track.uri)}
                      className="w-full py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-bold hover:scale-105 transition duration-300"
                    >
                      {currentTrack === track.uri && isPlaying
                        ? "Pause"
                        : "Play"}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Tracks;
