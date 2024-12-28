
import NavBar from "./components/navbar/NavBar";
import  { getSpotifyAccessToken } from "./api/spotify-token/route";
import Tracks from "./components/search/Tracks";
import InputBar from "./components/navbar/InputBar";


export default function Home() {
  return (
    <div >
      <NavBar />
      <Tracks />
    </div>
  );
}
