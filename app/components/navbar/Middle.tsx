import React from "react";
import { GoHome } from "react-icons/go";
import InputBar from "./InputBar";

const Middle = () => {
  const HomeIcon = GoHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="flex space-x-2 items-center">
      <div>
              <HomeIcon style={{ fontSize: 32 }} />
      </div>
      <div>
        <InputBar />
      </div>
    </div>
  );
};

export default Middle;
