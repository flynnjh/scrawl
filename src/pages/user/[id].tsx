import { signIn, signOut, useSession } from "next-auth/react";

import Layout from "../../components/layout/Layout";
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
      <Layout>
        <div className="flex flex-col bg-white h-full overflow-auto rounded-lg md:shadow-lg shadow-blue-gray-100">
          <div className="flex md:flex-row flex-col gap-4 items-center px-24 py-12 shadow-md shadow-blue-gray-100">
            <img
              className="rounded-full w-16 h-16"
              src={thoughts?.data?.[0]?.user?.image as string}
            />
            <h1 className="text-xl font-semibold text-center md:text-left">
              {thoughts?.data?.[0]?.user?.name} has been thinking about...
            </h1>
          </div>
          <div className="flex flex-col overflow-auto h-min items-center border-gray-200 border bg-blue-gray-50">
            {thoughts?.data
              ?.slice(0)
              .reverse()
              .map((thought) => (
                <div
                  className="flex w-full md:py-1 justify-center items-center"
                  key={thought.id}
                >
                  <ThoughtCard props={thought} key={thought.id} />
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default you;
