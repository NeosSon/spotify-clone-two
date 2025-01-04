"use client";

import {
  useAccessTokenStore,
  useLoggedInStore,
  useTokenStore,
} from "@/app/zustand-store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { access } from "fs";
import { set } from "zod";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const { tokenObject, setTokenObject } = useTokenStore();
  const { accessToken, setAccessToken } = useAccessTokenStore() as {
    accessToken: string;
    setAccessToken: (token: string) => void;
  };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (code) {
        try {
          const response = await fetch("/api/auth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            const error = await response.json();
            setErrorMessage(error.error || "Failed to fetch token");
            return;
          }

          const data = await response.json();

          // Debug API response
          setTokenObject(data); // Update Zustand state
          setAccessToken(data.access_token);
          localStorage.setItem("accessToken", data.access_token);

          // Update Zustand state
          router.push("/"); // Redirect to home page
        } catch (err) {
          console.error(err);
          setErrorMessage("An error occurred while fetching the token.");
        }
      }
    };

    fetchToken();
    // Comment out router.push("/") for debugging
  }, [code]);

  // Debug updated Zustand state
  useEffect(() => {}, [tokenObject]);

  if (error) {
    return <p>Error during authentication: {error}</p>;
  }

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
