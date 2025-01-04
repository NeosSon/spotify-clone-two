"use client";

import React, { useEffect, useState } from "react";
import { useAccessTokenStore } from "../../zustand-store/store";
import { motion } from "framer-motion";
import Image from "next/image";
import SpotifyPlayer from "react-spotify-web-playback";
import Link from "next/link";

interface ArtistData {
  name: string;
  image: string;
  bio: string;
  followers?: number;
  popularity?: number;
}

interface Track {
  name: string;
  album: {
    images: { url: string }[];
  };
  uri: string;
}

const fetchArtistData = async (artistId: string, accessToken: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = `Failed to fetch artist data: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};

const fetchTopTracks = async (artistId: string, accessToken: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = `Failed to fetch top tracks: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};

const ArtistPage = ({ params }: { params: Promise<{ artistId: string }> }) => {
  const { artistId } = React.use(params);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAccessTokenStore();
  const [playerToken, setPlayerToken] = useState<string | null>(null); // To store the access token for SpotifyPlayer
  const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);
  

  useEffect(() => {
    if (artistId && accessToken) {
      const getArtistData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchArtistData(artistId, accessToken);
          setArtistData({
            name: data.name,
            image: data.images[0]?.url || "",
            bio: data.genres.join(", ") || "No bio available",
            followers: data.followers.total,
            popularity: data.popularity,
          });

          const topTracksData = await fetchTopTracks(artistId, accessToken);
          setTopTracks(topTracksData.tracks);

          setPlayerToken(accessToken); // Set the player token for playback
        } catch (error) {
          console.error("Error fetching artist data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      getArtistData();
    }
  }, [artistId, accessToken]);

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!artistData) {
    return <div className="text-center text-xl">Artist not found</div>;
  }
  const playTrack = (trackUri: string) => {
    if (currentTrackUri === trackUri && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrackUri(trackUri);
      setIsPlaying(true);
      setPlayerToken(accessToken)
    }
  };

  return (
    <div className="relative overflow-hidden text-white bg-gradient-to-b from-transparent to-black">
      <Link href="/">
        <button className="bg-[#1DB954] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#1AA34A] active:bg-[#1A9431] focus:outline-none focus:ring-2 focus:ring-[#1DB954] m-2">
          Home
        </button>
      </Link>

      {/* Artist Background Image */}
      <div
        className="absolute top-0 left-0 w-full  bg-cover bg-center"
        style={{ backgroundImage: `url(${artistData.image})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>

      {/* Artist Information */}
      <div className="relative z-10 p-6 text-center">
        <motion.div
          className="w-64 h-64 mx-auto rounded-lg overflow-hidden mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={artistData.image}
            alt={artistData.name}
            width={256}
            height={256}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">{artistData.name}</h1>
        <p className="text-lg mb-4">{artistData.bio}</p>

        <div className="flex justify-center gap-12 mb-4">
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">Followers</p>
            <p className="text-2xl">
              {artistData.followers?.toLocaleString() || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">Popularity</p>
            <p className="text-2xl">{artistData.popularity || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Display Top Tracks */}
      <div className="text-center py-8 bg-gray-900">
        <h2 className="text-3xl font-semibold text-white mb-6">Top Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {topTracks.map((track, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 flex flex-col items-center justify-center"
            >
              {/* Image on top */}
              <Image
                src={track.album.images[0]?.url || "/fallback-image.png"}
                alt={track.name}
                width={160}
                height={160}
                className="rounded-lg mb-4"
              />
              {/* Title */}
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {track.name}
              </h3>
              {/* Play Track Button */}
              <button
                onClick={() => playTrack(track.uri)} // Trigger SpotifyPlayer when clicked
                className="mt-2 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full px-4 py-2 transition duration-300 ease-in-out"
              >
                Play Track
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Spotify Player */}
      {playerToken && (
        <SpotifyPlayer
          token={playerToken}
          uris={currentTrackUri ? [currentTrackUri] : []}
          play={isPlaying} // Automatically start playing
        />
      )}
    </div>
  );
};

export default ArtistPage;
