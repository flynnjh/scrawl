import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
  const [thoughtText, setThoughtText] = useState(String);
  const [newThoughtId, setNewThoughtId] = useState(String);
  const thought = trpc.useMutation(["thought.createThought"]);
  const router = useRouter();

  const handleCreateThought = async () => {
    const newThought = await thought.mutateAsync({ text: thoughtText });
    if (newThought.id) {
      setNewThoughtId(newThought.id);
    }
  };

  return (
    <>
      <Head>
        <title>fuckthebirdapp</title>
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-9">
        <textarea
          className="w-1/3 h-96 font-semibold"
          value={thoughtText}
          placeholder="What are you thinking about, bud?"
          onChange={(e) => setThoughtText(e.target.value)}
        ></textarea>
        <button
          className="text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
          onClick={handleCreateThought}
        >
          Release your thought...
        </button>
        {newThoughtId ? (
          <h1>
            Your thought is{" "}
            <Link href={`/thought/${newThoughtId}`}>
              <a className="text-sky-400 hover:underline">here</a>
            </Link>
            .
          </h1>
        ) : null}
      </main>
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
