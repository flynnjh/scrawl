import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import Layout from "../../components/Layout";
import Link from "next/link";
import React from "react";
import ThoughtCard from "../../components/ThoughtCard";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const you = () => {
  const router = useRouter();
  const userId = router.query.id! as string;
  const { data: session, status } = useSession();
  const thoughts = trpc.useQuery(["thought.getAllbyUser", { userId: userId }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <>
      <Head>
        <title>Scrawl</title>
      </Head>
      <Layout>
        <div className="flex flex-col h-screen w-full md:p-4 gap-9">
          <div className="flex flex-col bg-white h-full overflow-auto">
            <div className="flex flex-row gap-4 items-center px-24 py-12">
              <img
                className="rounded-full w-16 h-16"
                src={thoughts?.data?.[0]?.user?.image as string}
              />
              <h1 className="text-xl font-semibold">
                {thoughts?.data?.[0]?.user?.name} has been thinking about...
              </h1>
            </div>
            <div className="flex flex-col overflow-auto h-min items-center border-gray-200 border">
              {thoughts?.data
                ?.slice(0)
                .reverse()
                .map((thought) => (
                  <ThoughtCard props={thought} key={thought.id} />
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default you;
