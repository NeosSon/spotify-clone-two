"use client";
import NavBar from "./components/navbar/NavBar";
import ChooseWhatToDisplay from "./components/display/ChooseWhatToDisplay";

export default function Home() {
  return (
    <div>
      <NavBar />
      <ChooseWhatToDisplay />
    </div>
  );
}
