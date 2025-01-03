"use client";
import { useAccessTokenStore } from "@/app/zustand-store/store";
import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const SPOTIFY_API = "https://api.spotify.com/v1/me/top/tracks";

const Profile = () => {
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { accessToken } = useAccessTokenStore();

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    fetchTopTracks(); // Fetch the top tracks
  }, [accessToken]);

  const fetchTopTracks = async () => {
    if (!accessToken) return;
    const res = await fetch(SPOTIFY_API, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    setTopTracks(data.items);
  };

  const playTrack = (trackUri: string) => {
    if (currentTrackUri === trackUri && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrackUri(trackUri);
      setIsPlaying(true);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-6 text-black">
        Your Top Tracks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topTracks.map((track) => (
          <div
            key={track.id}
            className="bg-black p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-white font-semibold text-xl mb-2">
              {track.name}
            </h3>
            <p className="text-gray-400 mb-4">{track.artists[0].name}</p>
            <button
              onClick={() => playTrack(track.uri)}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full font-bold hover:scale-105 transition duration-300"
            >
              {currentTrackUri === track.uri && isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        ))}
      </div>

      {currentTrackUri && (
        <div className="mt-8">
          <SpotifyPlayer
            token={accessToken || ""}
            uris={[currentTrackUri]}
            play={isPlaying}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
