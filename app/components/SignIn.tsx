import React from "react";
import LoginButton from "./navbar/LoginButton";

export default function SignIn() {
  return (
    <div className="h-screen flex items-center justify-center text-center text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient bg-[length:200%_200%]">
      <div className="space-y-6 px-4">
        <h1 className="text-4xl font-bold">
          🎵 Welcome to Your Music Journey! 🎵
        </h1>
        <p className="text-lg">
          Discover your favorite tunes and vibe to the beats
          that move you.
        </p>
        <div className=" mx-auto px-6 py-3 bg-green-500 rounded-full text-lg font-medium hover:bg-green-600 transition w-56">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
