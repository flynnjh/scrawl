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
    <div className="flex flex-col bg-gray-800 w-28 h-screen">
      <Link href="/">
        <div className="flex justify-center w-full py-12 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
          <a className="text-white">Home</a>
        </div>
      </Link>
      <Link href={"/user/" + session?.user?.id}>
        <div className="flex flex-col w-full py-6 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
          <div className="flex flex-col justify-center items-center w-full">
            <img
              className="w-12 h-12 rounded-full"
              src={session?.user?.image as string}
            />
            <a className="text-white pt-2">Timeline</a>
          </div>
        </div>
      </Link>
      {session ? (
        <>
          <button className="text-white" onClick={() => signOut()}>
            <div className="flex justify-center w-full py-12 border-slate-500/60 border cursor-pointer hover:bg-gray-600">
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
  );
};

export default SideBar;
