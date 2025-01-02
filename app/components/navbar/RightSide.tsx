import React from "react";
import LoginButton from "./LoginButton";
import { useLoggedInStore } from "@/app/zustand-store/store";

const RightSide = () => {
  return (
    <div className="flex space-x-2 mr-2 ">
      <div>
        <LoginButton />
      </div>
    </div>
  );
};

export default RightSide;
