import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@material-tailwind/react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
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
    setThoughtText("");
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col bg-white h-full overflow-auto">
          <div className="flex flex-row gap-4 items-center px-24 py-12">
            <h1 className="text-4xl">
              {" "}
              Hi, {session?.user?.name}. How are you?{" "}
            </h1>
          </div>
          <div className="flex flex-col overflow-auto h-full items-center border-blue-gray-50 border">
            <div className="flex flex-col h-full w-full p-16 bg-blue-gray-50">
              <div className="flex flex-col w-full h-full border-2 border-slate-300 rounded-lg p-9 bg-white">
                <textarea
                  className="flex-1 resize-none px-0 w-full h-screen text-gray-800 bg-white text-2xl"
                  value={thoughtText}
                  placeholder="What are you thinking about, bud?"
                  onChange={(e) => setThoughtText(e.target.value)}
                ></textarea>
                {/* TODO: These buttons are causing layout issues on mobile, replace with dropdown on mobile. */}
                <div className="flex justify-end gap-4 w-full mt-auto pt-9 mb-9 pr-4">
                  <Button
                    className="hidden md:flex justify-end text-white bg-gray-500 hover:bg-gray-400 p-4 rounded-md"
                    onClick={() => {
                      alert("this button does nothing! :3");
                    }}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    className="hidden md:flex justify-end text-white bg-red-500 hover:bg-red-400 p-4 rounded-md"
                    onClick={() => {
                      alert("this button does nothing! :3");
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                    onClick={handleCreateThought}
                  >
                    Release
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
