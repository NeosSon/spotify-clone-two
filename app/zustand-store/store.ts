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
    
export const useSelectCategoryStore = create<SelectCategoryStore>((set: any) => ({
  selectedCategory: "",
  setSelectedCategory: (value: any) => set({ selectedCategory: value }),
}));