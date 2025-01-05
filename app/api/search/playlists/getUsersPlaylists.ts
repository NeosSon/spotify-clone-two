import { NextResponse } from "next/server";

export async function fetchUserPlaylists(token: string, url: string) {
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error fetching user playlists: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.items);
  } catch (error) {
    console.error("Error in fetchUserPlaylists:", error);
    return NextResponse.json(
      { error: "Failed to fetch user playlists" },
      { status: 500 }
    );
  }
}
