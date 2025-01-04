"use client";
import { useSelectCategoryStore } from "@/app/zustand-store/store";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Dropdown() {
  const { selectedCategory, setSelectedCategory } = useSelectCategoryStore();
  const router = useRouter();

  // Options for the dropdown
  const options = ["Artists", "Tracks", "Profile"];

  // Handle change in dropdown selection
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  // Use effect to handle page redirection when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === "Artists") {
        router.push("/artistHome");
      } else if (selectedCategory === "Tracks") {
        router.push("/tracks");
      } else if (selectedCategory === "Profile") {
        router.push("/profile");
      }
    }
  }, [selectedCategory, router]);

  return (
    <div>
      <select
        id="dropdown"
        value={selectedCategory}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="" disabled>
          Select Category
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
