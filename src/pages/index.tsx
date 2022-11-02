import { signIn, signOut, useSession } from "next-auth/react";

import { AiOutlineGithub } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { useRouter } from "next/router";

const Public = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isMobile = useMediaQuery(550);

  // This will be replaced soon.
  // TODO: Write privacy policy.

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
      <div className="flex flex-col overflow-auto h-screen bg-[#fbfbfc]">
        <Head>
          <title>Scrawl</title>
        </Head>
        <main className="flex flex-col h-full w-full justify-center items-center p-12">
          <p className="text-9xl py-4" aria-hidden>
            🔏
          </p>
          <h1 className="text-2xl pb-4">Scrawl</h1>
          <p className="text-lg text-center">
            Scrawl is a safe and private space for you to store your thoughts.
            No ads, data collection, likes or retweets.
          </p>
          <p className="text-lg text-center pb-8">
            Just you and what you&apos;re thinking.
          </p>
          <button
            className="flex flex-row rounded-md items-center bg-black text-white px-9 py-2"
            onClick={() => {
              signIn();
            }}
          >
            <AiOutlineGithub className="w-8 h-8 " />
            <h1 className="pl-4">Sign in with GitHub</h1>
          </button>
        </main>
        <footer className="p-9 mt-auto">
          <div className="flex flex-row items-center">
            <AiOutlineGithub
              className="w-8 h-8 fill-gray-800 hover:cursor-pointer"
              onClick={() => {
                router.push("https://github.com/flynnjh/scrawl");
              }}
            />
            <Link href="https://github.com/flynnjh/scrawl">
              <a className="text-gray-800 hover:underline pl-4">
                {!isMobile && "View the source code on GitHub."}
              </a>
            </Link>
            <Link href="https://twitter.com/distantsynths">
              <a className="text-gray-800 hover:underline ml-auto">Twitter</a>
            </Link>
            <Link href="/x/privacy-policy">
              <a className="text-gray-800 hover:underline ml-4">
                Privacy Policy
              </a>
            </Link>
          </div>
        </footer>
      </div>
    );
  }
};

export default Public;
