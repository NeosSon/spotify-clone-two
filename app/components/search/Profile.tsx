import { getProfile } from "@/app/api/profile/route";
import { useAccessTokenStore, useTokenStore } from "@/app/zustand-store/store";
import { get } from "http";
import React, { useEffect, useState } from "react";
import { access } from "fs";

interface ProfileData {
  display_name: string;
  images: { url: string }[];
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { tokenObject, setTokenObject } = useTokenStore();
  const { accessToken, setAccessToken } = useAccessTokenStore() as {
    accessToken: string;
    setAccessToken: (token: string) => void;
  };

  useEffect(() => {
    console.log(accessToken);
    console.log("tokenObject", tokenObject);
    async function getProfileData() {
      try {
        const data = await getProfile(accessToken);
        setProfileData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    getProfileData();
  }, []);

  return (
    <div>
      {profileData ? (
        <div>
          <h1>{profileData.display_name}</h1>
          {profileData.images[0] ? (
            <img src={profileData.images[0].url} alt="Profile Image" />
          ) : null}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;
