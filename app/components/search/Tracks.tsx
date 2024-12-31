"use client";

import { getSpotifyAccessToken } from "@/app/api/spotify-token/route";
import { getTracks, getTracksById } from "@/app/api/search/tracks/route";
import React, { useEffect, useState } from "react";
import { useInputStore, useSubmitButtonStore } from "@/app/zustand-store/store";
import { Card, CardContent } from "@/components/ui/card";

const Tracks = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { inputValue } = useInputStore();
  const { setSubmitValue, submitValue } = useSubmitButtonStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const fetchTrackData = async () => {
    setIsLoading(true); // Start loading
    try {
      const accessToken = await getSpotifyAccessToken();
      const tracks = await getTracks(accessToken, inputValue);

      if (tracks?.items?.length) {
        const songsMapped = tracks.items.map((track: any) => ({
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          id: track.id,
          image: track.album.images[0]?.url || "",
        }));

        const detailedTracks = [];
        for (const track of songsMapped) {
          try {
            const trackData = await getTracksById(accessToken, track.id);
            if (trackData) {
              detailedTracks.push({
                ...track,
                image: trackData.album.images[0]?.url || track.image,
              });
            }
          } catch (error) {
            console.error("Error fetching track details:", error);
          }
        }

        setSearchResults(detailedTracks.length ? detailedTracks : songsMapped);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (inputValue) {
      fetchTrackData();
    }
    setSubmitValue(false);
  }, [submitValue]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col mt-4">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader">Loading tracks...</div>
        </div>
      ) : (
        <>
          {inputValue && <h1 className="text-2xl font-bold mb-4">Tracks</h1>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.length > 0 ? (
              searchResults.map((track: any, index: number) => (
                <Card
                  key={index}
                  className="p-4 bg-gray-800 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <img
                        src={track.image}
                        alt={track.name}
                        className="rounded-lg w-full h-40 object-cover mb-4"
                      />
                      <h2 className="text-lg font-semibold">{track.name}</h2>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                      <p className="text-sm text-gray-500">{track.album}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                {inputValue ? "No tracks found." : "Search for a track."}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tracks;
