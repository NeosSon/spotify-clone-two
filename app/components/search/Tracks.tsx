"use client";
import { getSpotifyAccessToken } from "@/app/api/spotify-token/route";
import { getTracks } from "@/app/api/search/route";
import React, { useEffect, useState } from "react";
import { useInputStore, useSubmitButtonStore } from "@/app/zustand-store/store";

const Tracks = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { inputValue } = useInputStore();

  const { submitValue, setSubmitValue } = useSubmitButtonStore();
  const [songs, setSongs] = useState([]);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    
    const getTracksFromApi = async () => {
      try {
        const accessToken = await getSpotifyAccessToken();
        const tracks = await getTracks(accessToken, inputValue);

        if (tracks !== undefined) {
          let songsMapped = tracks.items.map((track: any) => {
            return {
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
            };
          });
          setSongs(songsMapped);
          setSearchResults(songs);
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    getTracksFromApi();
    setSubmitValue(false);

    
  }, [ inputValue]);

  if (!isClient) {
    return <div>Loading...</div>; // or a loading state
  }

  return (
    <div className="flex mt-4 flex-col">
      <div>{inputValue && <h1>Tracks</h1>}</div>
      <div>
        <ul>
          {inputValue === "" ? (
            <p>Search for a track</p>
          ) : (
            searchResults.map((track: any, index: number) => (
              <li key={index}>
                <p>Name: {track.name}</p>
                <p>Artist: {track.artist}</p>
                <p>Album: {track.album}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tracks;
