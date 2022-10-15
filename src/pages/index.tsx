import { signIn, signOut, useSession } from "next-auth/react";

import { ClipLoader } from "react-spinners";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Public = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // This will be replaced soon.

  if (status === "authenticated") {
    router.push("/home");
    return (
      <div className="flex h-screen w-full justify-center items-center text-2xl bg-blue-gray-50/70">
        <ClipLoader color="#42A5F5" size={50} />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full justify-center items-center text-2xl bg-blue-gray-50/70">
        <ClipLoader color="#42A5F5" size={50} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col overflow-auto h-screen justify-center items-center p-2">
        <Link href="/api/auth/signin">
          <a className="hover:underline text-blue-400 text-4xl">Sign In</a>
        </Link>
      </div>
    );
  }
};

export default Public;
