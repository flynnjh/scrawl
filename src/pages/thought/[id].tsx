import { User, thought } from "@prisma/client";

import Alert from "../../components/Alert";
import { Button } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import ThoughtCard from "../../components/ThoughtCard";
import { trpc } from "../../utils/trpc";
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
                  color={"blue-gray"}
                  onClick={() => {
                    handleDeleteThought(thought);
                  }}
                >
                  Delete
                </Button>

                {thought?.data?.userId == session?.user?.id &&
                !thought.data?.bookmark?.length ? (
                  <Button
                    variant="gradient"
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
                  <Button>Bookmarked.</Button>
                ) : null}
              </div>
            ) : null}{" "}
            {thought.data ? (
              <ThoughtCard
                thought={thought.data as thought}
                user={thought.data.user as User}
                key={thought.data?.id as string}
                expanded
              />
            ) : null}
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
