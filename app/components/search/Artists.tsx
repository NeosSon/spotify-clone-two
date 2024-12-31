"use client";
import { getArtist } from "@/app/api/search/artists/route";
import { getSpotifyAccessToken } from "@/app/api/spotify-token/route";
import { useInputStore } from "@/app/zustand-store/store";
import React, { useEffect, useState } from "react";

const Artists = () => {
  const { inputValue } = useInputStore();
  const [listOfArtists, setListOfArtists] = useState([]);
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

  return (
    <div>
      <ul>
        {listOfArtists && inputValue ? (
          listOfArtists.map((artist: any) => (
            <li key={artist.id}>{artist.name}</li>
          ))
        ) : (
          <li>Search for an artist</li>
        )}
      </ul>
    </div>
  );
};

export default Artists;
