"use client";
import React, { Suspense, memo } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import LeftSide from "./LeftSide";
import Middle from "./Middle";
import RightSide from "./RightSide";

// A simple loading spinner component
const LoadingSpinner = () => (
  <div className="animate-spin h-8 w-8 border-4 border-t-4 border-gray-500 rounded-full" />
);

const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname

  // Check if the URL contains the "artists" query parameter
  const isArtistsPage = pathname?.includes("artists");

  return (
    <nav className="bg-white shadow-md text-slate-950 flex justify-between items-center p-4 ">
      <div className="flex items-start">
        <LeftSide />
      </div>
      {/* Conditionally render the Middle component with a loading animation */}
      {!isArtistsPage && (
        <Suspense fallback={<LoadingSpinner />}>
          <Middle />
        </Suspense>
      )}
      <RightSide />
    </nav>
  );
};

export default memo(Navbar);
