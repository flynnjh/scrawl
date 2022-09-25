import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";
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

      <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-9">
        {thought.data ? (
          <div className="flex flex-col w-2/4 h-2/3 gap-4 bg-slate-50 p-24 rounded-lg">
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
        {thought.error?.message === "UNAUTHORIZED" ? <h1>fuck</h1> : null}
        {/* <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div> */}
      </main>
    </>
  );
};

export default thoughtPage;
