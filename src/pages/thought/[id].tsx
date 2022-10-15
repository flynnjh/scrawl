import { Alert, Button } from "@material-tailwind/react";

import Layout from "../../components/layout/Layout";
import Link from "next/link";
import type { NextPage } from "next";
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
        // TODO: display proper error message, though delete button should only be shown to the original poster.
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

  // TODO: fix avatar being squashed

  return (
    <Layout>
      <main className="flex flex-col bg-[#fbfbfc] h-full w-full rounded-md md:shadow-lg shadow-none shadow-blue-gray-100">
        <Alert
          show={deletedThoughtAlert}
          variant="gradient"
          className="absolute left-0 right-0 md:ml-auto md:mr-9 md:mt-4 md:w-1/5 w-3/4 mt-4 ml-auto mr-auto shadow-lg"
        >
          Your thought has been deleted.
        </Alert>
        <div className="flex flex-row items-center justify-center h-full w-full p-4 gap-9">
          {thought.data ? (
            <div className="flex flex-col w-full gap-4 rounded-md p-24">
              <div className="flex flex-row gap-4 items-center">
                <Link href={"/user/" + thought.data?.user.id}>
                  <a>
                    <img
                      className="rounded-full w-16 h-16 hover:border-2"
                      src={thought.data?.user.image as string}
                    />
                  </a>
                </Link>
                <div>
                  <h1 className="text-xl font-semibold">
                    {thought.data.user.name} was thinking about...
                  </h1>
                </div>
              </div>
              <div className="flex flex-col py-4">
                <h1 className="text-4xl">{thought.data?.text}</h1>
                <p className="text-lg pt-9">
                  as of {thought.data?.createdAt?.toLocaleString()}
                </p>
                {thought.data?.bookmark?.length ? (
                  <p className="text-lg">Bookmarked.</p>
                ) : null}
                {/* This is only temporary to test delete functionality */}
                {thought.data.userId == session?.user?.id ? (
                  <Button
                    variant="gradient"
                    onClick={() => {
                      handleDeleteThought(thought);
                    }}
                  >
                    Delete
                  </Button>
                ) : null}
                {thought.data.userId == session?.user?.id &&
                !thought.data?.bookmark?.length ? (
                  <Button
                    variant="gradient"
                    color={"light-blue"}
                    onClick={() => {
                      bookmark.mutateAsync({
                        userId: session.user?.id as string,
                        thoughtId: thoughtId,
                      });
                    }}
                  >
                    Bookmark
                  </Button>
                ) : null}
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
          {!thought.isFetching && !thought.data ? (
            <h1>thought not found :(</h1>
          ) : null}
        </div>
      </main>
    </Layout>
  );
};

export default thoughtPage;
