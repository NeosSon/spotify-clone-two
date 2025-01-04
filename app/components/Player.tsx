// components/Player.tsx
"use client";
import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useAccessTokenStore, usePlayerStore } from "../zustand-store/store";

const Player: React.FC = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayerStore();

  const { accessToken } = useAccessTokenStore(); // Replace with your Spotify access token

  if (!accessToken || !currentTrack) return null;

  return (
    <div className="w-full fixed bottom-0 bg-black text-white z-50">
      <SpotifyPlayer
        token={accessToken}
        uris={[currentTrack]} // Current track URI
        play={isPlaying} // Sync play/pause with Zustand state
        callback={(state) => {
          if (!state.isPlaying) pauseTrack();
        }}
        showSaveIcon
        autoPlay={true}
        styles={{
          bgColor: "#222",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1db954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
      />
    </div>
  );
};

export default Player;
