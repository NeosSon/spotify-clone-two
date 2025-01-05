"use client";
import { useEffect } from "react";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
interface InputStore {
  inputValue: string;
  setInputValue: (value: string) => void;
}

interface SubmitBurronStore {
  submitValue: boolean;
  setSubmitValue: (value: boolean) => void;
}

interface SelectCategoryStore {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

interface LoggedInStore {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}
interface TokenStore {
  tokenObject: any;

  setTokenObject: (value: Object) => void;
}
interface AccessTokenState {
  accessToken: string | null;
  tokenExpiresIn: number | null;
  setAccessToken: (token: string | null) => void;
}

interface PlayerState {
  currentTrack: string | null;
  isPlaying: boolean;
  playTrack: (track: string) => void;
  pauseTrack: () => void;
}

interface PlaylistState {
  playlistUrl: string;
  setPlaylistUrl: (value: string) => void;
}

export const usePlaylistStore = create<PlaylistState>((set: any) => ({
  playlistUrl: "",
  setPlaylistUrl: (value: any) => set({ playlistId: value }),
}));

// For the input bar
export const useInputStore = create<InputStore>((set: any) => ({
  inputValue: "",
  setInputValue: (value: any) => set({ inputValue: value }),
}));
//Check if the submit button is clicked in the input bar
export const useSubmitButtonStore = create<SubmitBurronStore>((set: any) => ({
  submitValue: false,
  setSubmitValue: (value: any) => set({ submitValue: value }),
}));

export const useSelectCategoryStore = create<SelectCategoryStore>(
  (set: any) => ({
    selectedCategory: "Tracks",
    setSelectedCategory: (value: any) => set({ selectedCategory: value }),
  })
);

export const useLoggedInStore = create<LoggedInStore>((set: any) => ({
  loggedIn:
    typeof window !== "undefined"
      ? localStorage.getItem("isExpired") === "false" ||
        localStorage.getItem("accessToken") !== null
      : false,
  setLoggedIn: (value: boolean) => set({ loggedIn: value }),
}));

export const useTokenStore = create<TokenStore>((set: any) => ({
  tokenObject: {},

  setTokenObject: (value: any) => set({ tokenObject: value }),
}));

export const useAccessTokenStore = create<AccessTokenState>((set) => ({
  // Initialize with token and expiration time from localStorage if available
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  tokenExpiresIn:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("tokenExpiresIn"))
      : null,

  setAccessToken: (token: string | null) => {
    const currentTime = Date.now(); // Get current timestamp in milliseconds
    const expirationTime = currentTime + 3600 * 1000; // 1 hour in milliseconds

    // Store in Zustand and localStorage
    set({
      accessToken: token,
      tokenExpiresIn: expirationTime,
    });

    if (typeof window !== "undefined") {
      if (token) {
        // Store token and expiration time in localStorage
        localStorage.setItem("accessToken", token);
        localStorage.setItem("tokenExpiresIn", expirationTime.toString());
      } else {
        // If the token is null, clear localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpiresIn");
      }
    }
  },
}));

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  playTrack: (track: string) =>
    set(() => ({
      currentTrack: track,
      isPlaying: true,
    })),
  pauseTrack: () =>
    set(() => ({
      isPlaying: false,
    })),
}));
