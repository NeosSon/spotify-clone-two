"use client";
import { useSelectCategoryStore } from '@/app/zustand-store/store';
import React, { useState } from 'react';
import { useStore } from 'zustand';

function Dropdown() {
  // State to hold the selected value
  const { selectedCategory, setSelectedCategory} = useSelectCategoryStore();

  // Options for the dropdown
  const options = ['Artists', 'Tracks', 'Playlists', 'Albums'];

  // Handle change in selection
  const handleChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      
      <select id="dropdown" value={selectedCategory} onChange={handleChange}>
        <option value="" disabled>Category</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>Selected: {selectedCategory || 'None'}</p>
    </div>
  );
}

export default Dropdown;
