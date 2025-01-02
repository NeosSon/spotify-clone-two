"use client";

import { useLoggedInStore, useTokenStore } from "@/app/zustand-store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { set } from "zod";

const LoginButton: React.FC = () => {
  const { loggedIn, setLoggedIn } = useLoggedInStore();
  const { tokenObject, setTokenObject } = useTokenStore();
  
  const router = useRouter();
  useEffect(() => {
    // This is a workaround to keep the user logged in after a refresh
    const sessionLoggedIn = sessionStorage.getItem("loggedIn") === "true";
    setLoggedIn(sessionLoggedIn);
    console.log("loggedIn", loggedIn);
    
  }, [loggedIn]);
  const handleLogin = () => {
    router.push("/api/auth/login");
    setLoggedIn(true);
    sessionStorage.setItem("loggedIn", "true");
  };
  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.setItem("loggedIn", "false");
  };

  return (
    <>
      {!loggedIn ? (
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
      ) : (
        <button onClick={handleLogout}>Sign out </button>
      )}
    </>
  );
};

export default LoginButton;
