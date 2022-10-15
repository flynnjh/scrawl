import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Public = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/home");
  }

  // This will be replaced soon.

  return (
    <div className="flex flex-col overflow-auto h-screen justify-center items-center p-2">
      <Link href="/api/auth/signin">
        <a className="hover:underline text-blue-400 text-4xl">Sign In</a>
      </Link>
    </div>
  );
};

export default Public;
