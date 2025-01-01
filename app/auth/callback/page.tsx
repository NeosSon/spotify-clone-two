"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const [tokenData, setTokenData] = useState<any>(null);
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
          setTokenData(data);
        } catch (err) {
          setErrorMessage("An error occurred while fetching the token.");
        }
      }
    };

    fetchToken();
    router.push("/"); // comment out if you want to see the page with details
  }, [code]);

  if (error) {
    return <p>Error during authentication: {error}</p>;
  }

  return (
    // <div>
    //   <h1>Spotify Authentication Callback</h1>
    //   {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    //   {!errorMessage && !tokenData && <p>Processing...</p>}
    //   {tokenData && (
    //     <div>
    //       <h2>Access Token:</h2>
    //       <pre>{JSON.stringify(tokenData, null, 2)}</pre>
    //     </div>
    //   )}
    // </div>
    <div>
      return <p>Redirecting...</p>;
    </div>
  );
}
