"use client";

import { useLoggedInStore, useTokenStore } from "@/app/zustand-store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginButton: React.FC = () => {
  const { loggedIn, setLoggedIn } = useLoggedInStore();
  const { tokenObject, setTokenObject } = useTokenStore();
  const tokenJson = JSON.stringify(tokenObject);
  const router = useRouter();
  useEffect(() => {
    try {
      if (tokenJson) {
        setLoggedIn(true);
        console.log("tokenJson", tokenJson);
      }
      if (!tokenJson) {
        setLoggedIn(false);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }, [tokenJson]);
  const handleLogin = () => {
    router.push("/api/auth/login");
  };

  return (
    <>
      {loggedIn ? (
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
        <p>Signed In as  </p>
      )}
    </>
  );
};

export default LoginButton;
