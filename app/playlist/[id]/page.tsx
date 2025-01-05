"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Use from next/navigation
import SpotifyPlayer from "react-spotify-web-playback";
import {
  useAccessTokenStore,
  usePlayerStore,
  usePlaylistStore,
} from "@/app/zustand-store/store";
import { getPlaylistTracks } from "@/app/api/search/playlists/route"; // Adjust API import as needed

const PlaylistDetailPage = () => {
  const [tracks, setTracks] = useState<any[]>([]); // Track data with detailed information
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAccessTokenStore();
  const [playlistUri, setPlaylistUri] = useState<string>("");
  const [currentTrackUri, setCurrentTrackUri] = useState<string>(""); // Track currently being played
  const { playlistUrl, setPlaylistUrl } = usePlaylistStore();
  // Using usePathname to extract URL path and split the dynamic segment (playlistId)
  const pathname = usePathname();
  const playlistId = pathname.split("/")[2]; // Assuming the URL structure is '/playlist/[id]'
  const { currentTrack, isPlaying, pauseTrack } = usePlayerStore();
  const playTheTrack = usePlayerStore((state) => state.playTrack);

  useEffect(() => {
    if (playlistId && accessToken) {
      // Fetch playlist details by its URL
      fetchPlaylistTracks(localStorage.getItem("playlistUrl") || "");
    }
  }, [playlistId, accessToken]);

  const fetchPlaylistTracks = async (playlistUrl: string) => {
    setIsLoading(true);
    try {
      const response = await getPlaylistTracks(accessToken || "", playlistUrl);
      console.log("response:", response);

      if (response && response.tracks) {
        const detailedTracks = response.tracks.items.map((track: any) => ({
          name: track.track.name,
          id: track.track.id,
          uri: track.track.uri,
          artist: track.track.artists
            .map((artist: any) => artist.name)
            .join(", "), // Multiple artists
          album: track.track.album.name,
          albumId: track.track.album.id,
          albumUri: track.track.album.uri,
          image: track.track.album.images[0]?.url || "", // First image or fallback to an empty string
          duration: Number(track.track.duration_ms), // Duration of the track in milliseconds
        }));
        setTracks(detailedTracks);

        setPlaylistUri(`spotify:playlist:${playlistId}`);
      }
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const playTrack = (trackUri: string) => {
    if (currentTrack === trackUri && isPlaying) {
      pauseTrack();
    } else {
      playTheTrack(trackUri);
    }
  };

  if (isLoading) {
    return <div>Loading playlist...</div>;
  }

  if (!accessToken) {
    return <div>Please sign in to play tracks.</div>;
  }
  console.log("tracks finally:", tracks);
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen text-white ">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Playlist Details
        </h2>

        {/* Display tracks */}
        <div className="space-y-2 w-[60%] mx-auto">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col space-y-2"
            >
              <div className="flex items-center">
                <img
                  src={track.image}
                  alt={track.album}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">{track.name}</h3>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                  <p className="text-sm text-gray-500">{track.album}</p>
                  <p className="text-xs text-gray-400">
                    Duration: {Math.floor(track.duration / 60000)}:
                    {((track.duration % 60000) / 1000)
                      .toFixed(0)
                      .padStart(2, "0")}{" "}
                    mins
                  </p>
                </div>
              </div>

              {/* Play button */}
              <button
                onClick={() => playTrack(track.uri)}
                className="mt-2 py-2 px-4 bg-green-500 text-white rounded-full hover:bg-green-700 mx-auto w-[40%]"
              >
                {currentTrack === track.uri ? "Pause" : "Play"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailPage;
