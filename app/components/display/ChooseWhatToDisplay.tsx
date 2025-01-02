"use client";
import {
  useLoggedInStore,
  useSelectCategoryStore,
} from "@/app/zustand-store/store";
import React, { useEffect } from "react";
import Artists from "../search/Artists";
import Tracks from "../search/Tracks";
import Profile from "../search/Profile";
// import Albums from "../search/Albums";

const ChooseWhatToDisplay = () => {
  const { selectedCategory, setSelectedCategory } = useSelectCategoryStore();
  const { loggedIn, setLoggedIn } = useLoggedInStore();
  
  return (
    <div>
      {selectedCategory === "Artists" ? (
        <Artists />
      ) : selectedCategory === "Tracks" ? (
        <Tracks />
      ) : selectedCategory === "Playlists" ? (
        <h1>Playlists</h1>
      ) : selectedCategory === "Profile" ? (
        <Profile />
      ) : (
        <h1>Choose a category</h1>
      )}
    </div>
  );
};

export default ChooseWhatToDisplay;
