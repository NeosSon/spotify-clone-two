export async function getTracks(
  accessToken: string | undefined,
  search: string
) {
<<<<<<< HEAD
  const limit = 10;
  const url = `https://api.spotify.com/v1/search?q=${search}&type=track&${limit}`;
=======
  const url = `https://api.spotify.com/v1/search?q=${search}&type=track`;
>>>>>>> b4849845a05d965ff767f97d60567496317bb868
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (response.ok) {
      const data: any = await response.json();

      return data.tracks;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}
<<<<<<< HEAD
=======

export async function getTracksById(
  accessToken: string | undefined,
  id: string
) {
  if (!accessToken) {
    console.error("Access token is undefined");
    return undefined;
  }

  const url = `https://api.spotify.com/v1/tracks/${id}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const data: any = await response.json();

      return data;
    } else if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      console.error(`Rate limited. Retry after ${retryAfter} seconds.`);
      return { retryAfter: parseInt(retryAfter || "1", 10) };
    } else {
      console.error(`API error: ${response.status} - ${response.statusText}`);
      const errorData = await response.json();
      console.error("Error details:", errorData);
      return undefined;
    }
  } catch (error) {
    console.error("Network or other error in getTracksById:", error);
    return undefined;
  }
}
>>>>>>> b4849845a05d965ff767f97d60567496317bb868
