export async function getArtist(accessToken: string | undefined, search: string) {
const baseUrl = `https://api.spotify.com/v1/search?q=${search}&type=artist`;
  const url = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: headers,
    });
    if (response.ok) {
      const data: any = await response.json();
      console.log("data:", data.artists);
      return data.artists;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}
