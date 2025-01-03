"use client"
import React from "react";
import Link from "next/link";
// import { usePathname } from 'next/navigation';
import LeftSide from "./LeftSide";
import Middle from "./Middle";
import RightSide from "./RightSide";

const Navbar = () => {
  // const pathname = usePathname(); // Get the current path

  // const isActive = (path: string) => pathname === path; // Check active route

  return (
    <nav className="bg-white shadow-md text-slate-950 flex justify-between items-center p-4">
      <div className="flex items-start">
        <LeftSide />
      </div>
      <Middle />
      <RightSide />
    </nav>
  );
};

export default Navbar;
