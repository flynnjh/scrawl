import Layout from "../../components/layout/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const thoughtPage: NextPage = () => {
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

  // TODO: fix avatar being squashed

  return (
    <Layout>
      <main className="flex flex-col bg-white h-full">
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
    </Layout>
  );
};

export default thoughtPage;
