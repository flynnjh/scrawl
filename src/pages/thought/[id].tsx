import Head from "next/head";
import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useState } from "react";

const thoughtPage: NextPage = () => {
  // const hello = trpc.useQuery(["thought.hello", { text: "there! :3" }]);

  const router = useRouter();
  const thoughtId = router.query.id! as string;

  const thought = trpc.useQuery(["thought.getById", { id: thoughtId }]);

  return (
    <>
      <Head>
        <title>fuckthebirdapp</title>
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-9">
        {thought.data ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl">{thought.data?.text}</h1>
            <p className="text-lg">
              {thought.data?.createdAt?.toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Loading..</p>
        )}
        {/* <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div> */}
      </main>
    </>
  );
};

export default thoughtPage;
