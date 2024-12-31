"use client";
import React from "react";
import { GoHome } from "react-icons/go";
import InputBar from "./InputBar";
import Dropdown from "./DropDown";
import Link from "next/link";

const Middle = () => {
  const HomeIcon = GoHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="flex space-x-2 items-center">
      <div className="hover:cursor-pointer hover:bg-slate-100 hover:rounded-full hover:p-2">
        <Link href="/" >
          <HomeIcon style={{ fontSize: 32 }} />
        </Link>
      </div>
      <div>
        <InputBar />
      </div>
      <div>
        <Dropdown />
      </div>
    </div>
  );
};

export default Middle;
