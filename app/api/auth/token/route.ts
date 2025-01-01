import { env } from "@/env.mts";
import { NextResponse } from "next/server";

const client_id = env.NEXT_PUBLIC_CLIENTID; // Replace with your Spotify client ID
const client_secret = env.NEXT_PUBLIC_CLIENTSECRET; // Replace with your Spotify client secret
const redirect_uri = "http://localhost:3000/auth/callback"; // Update with your callback route

export async function POST(req: Request) {
  const body = await req.json();
  const { code } = body;

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(
      `${client_id}:${client_secret}`
    ).toString("base64")}`,
  };

  const bodyParams = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri,
  });

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers,
      body: bodyParams.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    const tokenData = await response.json();
    return NextResponse.json(tokenData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to exchange authorization code" },
      { status: 500 }
    );
  }
}
