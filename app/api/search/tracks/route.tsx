export async function getTracks(
  accessToken: string | undefined,
  search: string
) {
  const limit = 10;
  const url = `https://api.spotify.com/v1/search?q=${search}&type=track&${limit}`;
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
