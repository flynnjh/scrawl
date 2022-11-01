import Layout from "../components/layout/Layout";
import type { NextPage } from "next";
import ThoughtCard from "../components/ThoughtCard";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";

const Bookmarks: NextPage = () => {
  const { data: session, status } = useSession();

  const bookmarks = trpc.useQuery(
    ["bookmark.getAllbyUser", { userId: session?.user?.id as string }],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return (
    <Layout>
      <div className="flex flex-col bg-gray-50 h-full w-full overflow-auto rounded-lg md:shadow-lg shadow-blue-gray-100">
        <header className="flex flex-col gap-4 md:px-24 p-9 py-12 shadow-md shadow-blue-gray-100 z-10">
          <h1 className="text-4xl text-left">Bookmarks</h1>
          <p className="flex w-full h-full md:text-left text-gray-600 text-lg">
            All your most important thoughts...
          </p>
        </header>
        <div className="flex flex-col overflow-auto h-full items-center border-gray-200 border bg-blue-gray-50">
          {bookmarks?.data?.slice(0).map((bookmark) => (
            <div
              className="flex w-full md:py-1 justify-center items-center"
              key={bookmark.id}
            >
              <ThoughtCard thought={bookmark.thought} key={bookmark.id} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Bookmarks;
