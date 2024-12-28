export async function getTracks(accessToken: string | undefined, search: string) {
  const url = `https://api.spotify.com/v1/search?q=${search}&type=track`;
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
      console.log("Tracks:", data.tracks);
      return data.tracks;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}
