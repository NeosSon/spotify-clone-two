import { create } from "zustand";

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
interface AccessTokenStore {
  accessToken: string;
  setAccessToken: (value: string) => void;
}

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
  loggedIn: false,
  setLoggedIn: (value: any) => set({ loggedIn: value }),
}));

export const useTokenStore = create<TokenStore>((set: any) => ({
  tokenObject: {},
  setTokenObject: (value: any) => set({ tokenObject: value }),
}));

export const useAccessTokenStore = create((set) => ({
  accessToken: localStorage.getItem("accessToken") || null, // Load from localStorage initially
  setAccessToken: (token: string) => {
    localStorage.setItem("accessToken", token); // Save to localStorage
    set({ accessToken: token });
  },
}));
