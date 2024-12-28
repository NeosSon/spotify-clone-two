"use client";
import React from "react";
import { SlSocialSpotify } from "react-icons/sl";

const LeftSide = () => {
    const SpotifyIcon = SlSocialSpotify as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="mx-2">
      <SpotifyIcon style={{ fontSize: 32 }} />
    </div>
  );
};

export default LeftSide;
