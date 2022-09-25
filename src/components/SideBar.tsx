import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <div className="flex flex-col bg-gray-800 w-28 h-screen">
      <Link href="/">
        <div className="flex justify-center w-full py-12 border-slate-500/60 border cursor-pointer">
          <a className="text-white">Home</a>
        </div>
      </Link>
      <Link href="/you">
        <div className="flex justify-center w-full py-12 border-slate-500/60 border cursor-pointer">
          <a className="text-white">Profile</a>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
