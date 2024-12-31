// import { getAlbums } from "@/app/api/search/albums/route";
// import { getSpotifyAccessToken } from "@/app/api/spotify-token/route";
// import { useInputStore, useSubmitButtonStore } from "@/app/zustand-store/store";
// import { Card, CardContent } from "@/components/ui/card";
// import React, { useEffect, useState } from "react";

// const Albums = () => {
//   const [searchResults, setSearchResults] = useState([]);
//   const { inputValue } = useInputStore();
//   const { submitValue, setSubmitValue } = useSubmitButtonStore();
//   const [songs, setSongs] = useState([]);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);

//     const getTracksFromApi = async () => {
//       try {
//         const accessToken = await getSpotifyAccessToken();
//         const tracks = await getAlbums(accessToken, inputValue);

//         if (tracks !== undefined) {
//         //   let songsMapped = tracks. map((track: any) => {
//         //     return {
//         //       name: track.name,
//         //       artist: track.artists[0].name,
//         //       album: track.album.name,
//         //     };
//         //   });
//         //   setSongs(songsMapped);
//             //   setSearchResults(songs);
//             console.log("albums from api:", tracks);
//         }
//       } catch (error) {
//         console.error("Error fetching tracks:", error);
//       }
//     };
//     getTracksFromApi();
//     setSubmitValue(false);
//   }, [inputValue]);

//   if (!isClient) {
//     return <div>Loading...</div>; // or a loading state
//   }
//   console.log("Search:", searchResults);
//   return (
//     <div className="flex mt-4 flex-col">
//       <div>{inputValue && <h1>Tracks</h1>}</div>
//       <div>
//         <Card>
//           <ul>
//             {inputValue === "" ? (
//               <p>Search for a track</p>
//             ) : (
//               searchResults.map((track: any, index: number) => (
//                 <li key={index}>
//                   <CardContent>
//                     <p>Name: {track.name}</p>
//                     <p>Artist: {track.artist}</p>
//                     <p>Album: {track.album}</p>
//                   </CardContent>
//                 </li>
//               ))
//             )}
//           </ul>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Albums;
