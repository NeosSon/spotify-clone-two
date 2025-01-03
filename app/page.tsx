
import NavBar from "./components/navbar/NavBar";
import ChooseWhatToDisplay from "./components/display/ChooseWhatToDisplay";
import { useAccessTokenInitializer, useAccessTokenStore } from "./zustand-store/store";

export default function Home() {
  // useAccessTokenInitializer();
  return (
    <div>
      <NavBar />
      <ChooseWhatToDisplay />
    </div>
  );
}
