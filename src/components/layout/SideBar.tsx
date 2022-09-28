import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    router.push("/public");
  }
  return (
    <div className="flex flex-col bg-gray-800 w-28 xl:w-96 md:w-64 overflow-auto h-screen">
      <div className="flex flex-col h-full">
        <div className="flex justify-center items-center py-16">
          <h1 className="text-white md:text-4xl">Scrawl</h1>
        </div>
        <Link href={"/"}>
          <div className="flex lg:flex-row flex-col w-full py-6 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
            <div className="flex lg:flex-row flex-col md:justify-start md:pl-16 md:max-h-10 items-center w-full">
              <img
                className="w-12 h-12 rounded-full"
                src={session?.user?.image as string}
              />
              <a className="text-white pt-2 lg:pl-4 md:text-xl">Home</a>
            </div>
          </div>
        </Link>
        <Link href={"/user/" + session?.user?.id}>
          <div className="flex lg:flex-row flex-col w-full py-6 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
            <div className="flex lg:flex-row flex-col md:justify-start md:pl-16 md:max-h-10 items-center w-full">
              <img
                className="w-12 h-12 rounded-full"
                src={session?.user?.image as string}
              />
              <a className="text-white pt-2 lg:pl-4 md:text-xl">Timeline</a>
            </div>
          </div>
        </Link>
        <Link href={"/public"}>
          <div className="flex lg:flex-row flex-col w-full py-6 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
            <div className="flex lg:flex-row flex-col md:justify-start md:pl-16 md:max-h-10 items-center w-full">
              <img
                className="w-12 h-12 rounded-full"
                src={session?.user?.image as string}
              />
              <a className="text-white pt-2 lg:pl-4 md:text-xl">Bookmarks</a>
            </div>
          </div>
        </Link>
        {session ? (
          <>
            <button className="text-white mt-auto" onClick={() => signOut()}>
              <div className="flex md:max-h-10 justify-center items-center text-xl w-full py-12 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
                Sign Out
              </div>
            </button>
          </>
        ) : null}
        {status === "loading" ? (
          <div className="flex justify-center w-full py-12 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
            <a className="text-white">Loading...</a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
