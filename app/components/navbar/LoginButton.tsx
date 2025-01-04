"use client";

import { useAccessTokenStore } from "@/app/zustand-store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginButton: React.FC = () => {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const router = useRouter();

  // State to track if the token is expired and if the user is logged in
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [sessionLoggedIn, setSessionLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize state from storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = sessionStorage.getItem("loggedIn") === "true";
      const tokenExpiresIn = parseInt(
        localStorage.getItem("tokenExpiresIn") || "0",
        10
      );
      const isTokenExpired = tokenExpiresIn <= Date.now();

      setSessionLoggedIn(loggedIn);
      setIsExpired(isTokenExpired);
      setLoading(false); // Mark loading as complete
    }
  }, []);

  // Update storage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("loggedIn", sessionLoggedIn ? "true" : "false");
      localStorage.setItem("isExpired", isExpired.toString());
    }
  }, [isExpired, sessionLoggedIn]);

  // Handle login
  const handleLogin = () => {
    setSessionLoggedIn(true);
    setIsExpired(false);

    // Update storage
    sessionStorage.setItem("loggedIn", "true");
    localStorage.setItem("isExpired", "false");

    router.push("/api/auth/login");
  };

  // Handle logout
  const handleLogout = () => {
    setSessionLoggedIn(false);
    setIsExpired(true);
    setAccessToken(null); // Clear token in Zustand store

    // Clear storage
    sessionStorage.clear();
    localStorage.setItem("isExpired", "true");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {accessToken || !isExpired ? (
        <button onClick={handleLogout}>Sign out</button>
      ) : (
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1DB954",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login with Spotify
        </button>
      )}
    </>
  );
};

export default LoginButton;
