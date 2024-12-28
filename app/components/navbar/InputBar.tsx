"use client";
import React, { useState } from 'react';

const InputBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitted value:', inputValue);
    setInputValue(''); // Clear input after submission
  };

  return (
    <div className="flex items-center space-x-2 border p-2 rounded-full shadow-md w-96">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="What do you want to play?"
        className="border-none outline-none flex-1 text-base px-10 py-1"
      />
      <button
        onClick={handleSubmit}
        className=" text-black px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default InputBar;
