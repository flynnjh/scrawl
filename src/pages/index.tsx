import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const [thoughtText, setThoughtText] = useState(String);
  const [newThoughtId, setNewThoughtId] = useState(String);
  const thought = trpc.useMutation(["thought.createThought"]);

  const handleCreateThought = async () => {
    console.log(session?.user);
    if (!session?.user?.id) {
      console.log("ffs");
      return;
    }
    const newThought = await thought.mutateAsync({
      text: thoughtText,
      userId: session?.user?.id,
    });
    if (newThought.id) {
      setNewThoughtId(newThought.id);
    }
  };

  return (
    <>
      <Head>
        <title>Scrawl</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen w-full">
          <div className="flex flex-col md:w-2/3 bg-base-100 md:h-4/6 h-full border-2 border-slate-300 bg-white rounded-md p-9">
            {session ? (
              <h1 className="text-4xl p-4">
                {" "}
                Hi, {session.user?.name}. How are you?{" "}
              </h1>
            ) : null}
            <div className="flex w-full justify-center items-center mt-9 px-4">
              <textarea
                className="h-96 font-semibold w-full bg-transparent"
                value={thoughtText}
                placeholder="What are you thinking about, bud?"
                onChange={(e) => setThoughtText(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end gap-4 w-full mt-auto pt-9 mb-9 pr-4">
              <button
                className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                onClick={handleCreateThought}
              >
                Release your thought...
              </button>

              <button
                className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                onClick={handleCreateThought}
              >
                Release
              </button>
            </div>
          </div>
          {newThoughtId ? (
            <h1>
              Your thought is{" "}
              <Link href={`/thought/${newThoughtId}`}>
                <a className="text-sky-400 hover:underline">here</a>
              </Link>
              .
            </h1>
          ) : null}
        </div>
      </Layout>
    </>
  );
};

export default Home;

{
  /*  <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
  <TechnologyCard
    name="TailwindCSS"
    description="Rapidly build modern websites without ever leaving your HTML"
    documentation="https://tailwindcss.com/"
  />
</div> */
}

// type TechnologyCardProps = {
//   name: string;
//   description: string;
//   documentation: string;
// };

// const TechnologyCard = ({
//   name,
//   description,
//   documentation,
// }: TechnologyCardProps) => {
//   return (
//     <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
//       <h2 className="text-lg text-gray-700">{name}</h2>
//       <p className="text-sm text-gray-600">{description}</p>
//       <a
//         className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
//         href={documentation}
//         target="_blank"
//         rel="noreferrer"
//       >
//         Documentation
//       </a>
//     </section>
//   );
// };
