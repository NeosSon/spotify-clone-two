



export const getProfile = async (accessToken: string): Promise<any> => {
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }

    return response.json();
}