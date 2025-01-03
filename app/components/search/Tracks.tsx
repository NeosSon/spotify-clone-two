"use client";
import { getTracks, getTracksByIdOrName } from "@/app/api/search/tracks/route";
import React, { useEffect, useState } from "react";
import {
  useAccessTokenStore,
  useInputStore,
  useSubmitButtonStore,
} from "@/app/zustand-store/store";
import { Card, CardContent } from "@/components/ui/card";
import SpotifyPlayer from "react-spotify-web-playback";

const Tracks = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { inputValue } = useInputStore();
  const { setSubmitValue, submitValue } = useSubmitButtonStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { accessToken, setAccessToken } = useAccessTokenStore();

  const fetchTrackData = async () => {
    
    setIsLoading(true);
    try {
      const token = accessToken;
      setAccessToken(token || "");
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
            const trackData = await getTracksByIdOrName(token || "", track.name);
            
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
    setIsClient(true);
    if (inputValue) {
      fetchTrackData();
    }
    setSubmitValue(false);
  }, [submitValue]);

  const playTrack = (trackUri: string) => {
    if (currentTrackUri === trackUri && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrackUri(trackUri);
      setIsPlaying(true);
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }
  // console.log(searchResults);
  return (
    <div className="flex flex-col mt-4">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader">Loading tracks...</div>
        </div>
      ) : (
        <>
          {inputValue && (
            <h1 className="text-3xl font-bold mb-6 text-center text-[#1DB954]">
              Tracks
            </h1>
          )}
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
                      <button
                        onClick={() => playTrack(track.uri)}
                        className="w-full py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-bold hover:scale-105 transition duration-300"
                      >
                        {currentTrackUri === track.uri && isPlaying
                          ? "Pause"
                          : "Play"}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <h2 className="text-3xl font-bold mb-4 text-center text-[#1DB954]">
                {inputValue ? "No tracks found." : "Search for a track"}
              </h2>
            )}
          </div>
        </>
      )}

      {currentTrackUri && (
        <div className="mt-8">
          <SpotifyPlayer
            token={accessToken || ""}
            uris={[currentTrackUri]}
            play={isPlaying}
            callback={(state) => {
              if (!state.isPlaying) setIsPlaying(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tracks;
