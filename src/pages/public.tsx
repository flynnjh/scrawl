import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Public = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Scrawl</title>
      </Head>

      <div className="flex flex-col h-screen w-full md:p-4 gap-9">
        <div className="flex flex-col overflow-auto h-screen justify-center items-center p-24 bg-gray-200">
          <h1>
            Not signed in. Sign in{" "}
            <Link href="/api/auth/signin">
              <a className="hover:underline text-sky-400">here</a>
            </Link>
            .
          </h1>
        </div>
      </div>
    </>
  );
};

export default Public;
