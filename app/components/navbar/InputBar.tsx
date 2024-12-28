"use client";
import React, { useEffect, useState } from "react";
import Tracks from "../search/Tracks";
import { useInputStore, useSubmitButtonStore } from "@/app/zustand-store/store";

const InputBar = () => {
  const { inputValue, setInputValue } = useInputStore();
  const { submitValue, setSubmitValue } = useSubmitButtonStore();
  const [isClient, setIsClient] = useState(false);
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setSubmitValue(true);
    
  };

  console.log("Input Value:", inputValue);
  useEffect(() => {
    setIsClient(true);
    setSubmitValue(false);

    setInputValue(inputValue);
  }, [inputValue]);
  if (!isClient) {
    return <div>Loading... </div>; // or a loading state
  }

  return (
    <>
      {/* Input Bar */}
      <div className="flex items-center space-x-2 border p-2 rounded-full shadow-md w-80">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="What do you want to play?"
          className="border-none outline-none flex-1 text-base px-10 py-1"
        />
        
      </div>
    </>
  );
};

export default InputBar;
