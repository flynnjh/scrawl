import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import Layout from "../../components/Layout";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const you = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const user = trpc.useQuery([
    "user.getUserById",
    { userId: session?.user?.id as string },
  ]);
  const username = trpc.useMutation(["user.updateUsername"]);

  if (user.data?.username && user.isFetched) {
    router.push("/");
  }
  const [newUsername, setNewUsername] = useState(String);

  const updateUsername = async (desiredUsername: string) => {
    if (!session?.user?.id) {
      console.log("ffs");
      return;
    }
    await username
      .mutateAsync({
        userId: session?.user.id,
        username: desiredUsername,
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <Head>
        <title>fuckthebirdapp</title>
      </Head>
      <Layout>
        <div className="flex flex-col h-screen w-full md:p-4 gap-9">
          <div className="flex flex-col h-full overflow-auto justify-center items-center">
            <div className="flex flex-col w-2/3 h-2/3 bg-slate-200">
              <h1 className="text-4xl p-9">
                Hello, {session?.user?.name}! What would you like your username
                to be?
              </h1>
              <div className="p-9">
                <h1 className="pb-2">Username</h1>
                <textarea
                  className="w-full rounded-md"
                  onChange={(e) => setNewUsername(e.target.value)}
                ></textarea>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                  onClick={() => {
                    updateUsername(newUsername);
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default you;
