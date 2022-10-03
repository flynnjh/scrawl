import { MdBookmark, MdHome } from "react-icons/md";
import React, { ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { IconButton } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  children?: ReactNode;
  link?: ReactNode;
}

const SButton = ({ children, ...props }: Props) => {
  return (
    <Link href={"/" + props.link}>
      <div className="flex lg:flex-row flex-col w-full py-6 cursor-pointer hover:bg-gray-600">
        <div className="flex lg:flex-row flex-col lg:justify-start justify-center lg:pl-8 lg:h-10 items-center w-full">
          {children}
        </div>
      </div>
    </Link>
  );
};

const SideBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    router.push("/public");
  }
  return (
    <div className="flex flex-col w-28 lg:w-96 md:w-64 overflow-auto h-screen shadow-md">
      <div className="flex justify-center items-center py-16">
        <h1 className="text-black md:text-6xl text-4xl">🔏</h1>
      </div>
      <div className="flex flex-col h-full">
        <SButton link={"/"}>
          <MdHome className="w-12 h-12" />
          <a className="text-black lg:pl-4 md:text-xl">Home</a>
        </SButton>
        <SButton link={"/user/" + session?.user?.id}>
          <img
            className="w-12 h-12 rounded-full"
            src={session?.user?.image as string}
          />
          <a className="text-black lg:pl-4 md:text-xl">Timeline</a>
        </SButton>
        <SButton link={"/404"}>
          <MdBookmark className="w-12 h-12 rounded-full" />
          <a className="text-black lg:pl-4 md:text-xl">Bookmarks</a>
        </SButton>
        {session ? (
          <>
            <button className="text-black mt-auto" onClick={() => signOut()}>
              <div className="flex md:max-h-10 justify-center items-center text-xl w-full py-12 cursor-pointer hover:bg-gray-600">
                Sign Out
              </div>
            </button>
          </>
        ) : null}
        {status === "loading" ? (
          <div className="flex justify-center w-full py-12 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
            <a className="text-black">Loading...</a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
