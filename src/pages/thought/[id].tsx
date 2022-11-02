import { User, thought } from "@prisma/client";

import Alert from "../../components/Alert";
import { Button } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import ThoughtCard from "../../components/ThoughtCard";
import { trpc } from "../../utils/trpc";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

const thoughtPage: NextPage = () => {
  const { data: session } = useSession();
  const [deletedThoughtAlert, setDeletedThoughtAlert] = useState(Boolean);

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

  const recentThoughts = trpc.useQuery(
    [
      "thought.getRecentThoughts",
      {
        userId: thought.data?.userId as string,
        thoughtDate: thought.data?.createdAt as Date,
      },
    ],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const deleteThought = trpc.useMutation(["thought.delete"]);

  const handleDeleteThought = async (thought: any) => {
    const deletedThought = await deleteThought
      .mutateAsync({
        id: thought.data.id,
        userId: session?.user?.id as string,
      })
      .catch((err) => {
        alert(err);
      });

    if (deletedThought) {
      setDeletedThoughtAlert(true);
      setTimeout(() => {
        setDeletedThoughtAlert(false);
      }, 3000);
    }
    return;
  };

  const bookmark = trpc.useMutation(["bookmark.create"]);
  const removebookmark = trpc.useMutation(["bookmark.delete"]);

  const isMobile = useMediaQuery(550);

  return (
    <Layout>
      <main className="flex flex-col bg-[#fbfbfc] h-full w-full rounded-md md:shadow-lg shadow-none shadow-blue-gray-100">
        <Alert show={deletedThoughtAlert}>Your thought has been deleted.</Alert>
        {thought.data ? (
          <div className="flex flex-col h-min w-full p-4 gap-9 overflow-auto">
            {thought?.data?.userId == session?.user?.id ? (
              <div className="flex justify-end gap-4 w-full pr-4 pb-4 border-b-2">
                <Button
                  variant="gradient"
                  className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                  color={"blue-gray"}
                  onClick={() => {
                    handleDeleteThought(thought);
                  }}
                >
                  Delete
                </Button>
                {/* TODO: update these functions to make use of the Alert component */}
                {thought?.data?.userId == session?.user?.id &&
                !thought.data?.bookmark?.length ? (
                  <Button
                    variant="gradient"
                    className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                    onClick={() => {
                      bookmark.mutateAsync({
                        userId: session?.user?.id as string,
                        thoughtId: thoughtId,
                      });
                    }}
                  >
                    Bookmark
                  </Button>
                ) : thought?.data?.userId == session?.user?.id &&
                  thought.data?.bookmark?.length ? (
                  <Button
                    variant="gradient"
                    className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                    onClick={() => {
                      removebookmark.mutateAsync({
                        userId: session?.user?.id as string,
                        bookmarkId: thought.data?.bookmark[0]?.id as string,
                      });
                    }}
                  >
                    Un-Bookmark
                  </Button>
                ) : null}
              </div>
            ) : null}{" "}
            <div className="flex flex-col h-full w-full justify-center items-center pb-8 border-b-2">
              {thought.data ? (
                <div className="w-11/12">
                  <ThoughtCard
                    thought={thought.data as thought}
                    user={thought.data.user as User}
                    key={thought.data?.id as string}
                    expanded
                  />
                </div>
              ) : null}
            </div>
            {thought.isFetching && !thought.data ? (
              <ClipLoader color="#42A5F5" size={50} />
            ) : null}
            {thought.error?.message === "UNAUTHORIZED" ? (
              <div className="flex flex-col w-2/4 h-2/3 gap-4 bg-slate-50 p-24 rounded-lg">
                <h1 className="flex justify-center text-2xl font-semibold text-center">
                  You{"'"}re unable to view this entry because the original
                  poster limited its visibility.
                </h1>
              </div>
            ) : null}
            {thought?.data?.userId == session?.user?.id && !isMobile ? (
              <div className="flex flex-col w-full h-max bg-blue-gray-50/70 md:rounded-md justify-center items-center">
                <h1 className="text-4xl py-12 md:w-11/12 md:text-left text-center">
                  You&apos;ve been thinking about...
                </h1>
                {recentThoughts.data
                  ? recentThoughts.data.reverse().map((t) => (
                      <div
                        className="flex flex-col w-full h-full justify-center items-center md:py-1"
                        key={t.id}
                      >
                        {thought.data?.id != t.id ? (
                          <ThoughtCard thought={t} key={t.id} />
                        ) : null}
                      </div>
                    ))
                  : null}
              </div>
            ) : null}
            {isMobile ? (
              <div className="flex flex-col w-full h-full text-center py-9">
                <p className="text-2xl">Got something on your mind?</p>
                <Link href="/home">
                  <a className="text-xl py-4 hover:underline text-blue-500">
                    Back to home.
                  </a>
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
        {!thought.isFetching && !thought.data ? (
          <div className="flex flex-col justify-center items-center h-full gap-4 text-center">
            <h1 className="text-2xl">thought not found :(</h1>
            <Link href="/home">
              <a className="hover:underline text-blue-500 text-xl">
                Back to home.
              </a>
            </Link>
          </div>
        ) : null}
      </main>
    </Layout>
  );
};

export default thoughtPage;
