import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import SideBar from "../../components/SideBar";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const thoughtPage: NextPage = () => {
  // const hello = trpc.useQuery(["thought.hello", { text: "there! :3" }]);
  const { data: session } = useSession();

  const router = useRouter();

  const thoughtId = router.query.id! as string;
  const thought = trpc.useQuery(
    ["thought.getById", { id: thoughtId, userId: session?.user?.id as string }],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  console.log(thought.error?.message);

  return (
    <>
      <Head>
        <title>fuckthebirdapp</title>
      </Head>

      <main className="flex flex-row w-screen">
        <SideBar />
        <div className="flex flex-row items-center justify-center min-h-screen w-full p-4 gap-9">
          {thought.data ? (
            <div className="flex flex-col w-2/4 gap-4 bg-slate-50 p-24 rounded-lg">
              <div className="flex flex-row gap-4 items-center">
                <img
                  className="rounded-full w-16 h-16"
                  src={thought.data?.user.image as string}
                />
                <h1 className="text-xl font-semibold">
                  {thought.data.user.name} is thinking about...
                </h1>
              </div>
              <div className="flex flex-col py-4">
                <h1 className="text-4xl">{thought.data?.text}</h1>
                <p className="text-lg pt-9">
                  {thought.data?.createdAt?.toLocaleString()}
                </p>
              </div>
            </div>
          ) : null}
          {thought.isFetching ? <h1>Loading...</h1> : null}
          {thought.error?.message === "UNAUTHORIZED" ? (
            <div className="flex flex-col w-2/4 h-2/3 gap-4 bg-slate-50 p-24 rounded-lg">
              <h1 className="flex justify-center text-2xl font-semibold text-center">
                You{"'"}re unable to view this entry because the original poster
                limited its visibility.
              </h1>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default thoughtPage;
