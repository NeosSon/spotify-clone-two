"use client";
import { useSelectCategoryStore } from "@/app/zustand-store/store";
import React from "react";
import Artists from "../search/Artists";
import Tracks from "../search/Tracks";
// import Albums from "../search/Albums";

const ChooseWhatToDisplay = () => {
  const { selectedCategory, setSelectedCategory } = useSelectCategoryStore();
  return (
    <div>
      {selectedCategory === "Artists" ? (
        <Artists />
      ) : selectedCategory === "Tracks" ? (
        <Tracks />
      ) : selectedCategory === "Playlists" ? (
        <h1>Playlists</h1>
      ) : selectedCategory === "Albums" ? (
              // <Albums />
              <h1>Albums</h1>
      ) : (
        <h1>Choose a category</h1>
      )}
    </div>
  );
};

export default ChooseWhatToDisplay;
