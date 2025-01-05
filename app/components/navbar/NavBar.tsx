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
    <nav className=" text-slate-950 flex bg-white items-center p-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ">
      <div className="flex items-start">
        <LeftSide />
      </div>
      <div className="flex items-center justify-center flex-1">
        {/* Conditionally render the Middle component with a loading animation */}
        {!isArtistsPage && (
          <Suspense fallback={<LoadingSpinner />}>
            <Middle />
          </Suspense>
        )}
      </div>
      <RightSide />
    </nav>
  );
};

export default memo(Navbar);
