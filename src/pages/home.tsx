import { Button, Chip } from "@material-tailwind/react";
import React, { Fragment } from "react";

import Alert from "../components/Alert";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import useMediaQuery from "../hooks/useMediaQuery";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home: NextPage = () => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const { data: session, status } = useSession();

  const [thoughtText, setThoughtText] = useState(String);
  const [newThoughtId, setNewThoughtId] = useState(String);
  const [newThoughtAlert, setNewThoughtAlert] = useState(Boolean);
  const thought = trpc.useMutation(["thought.create"]);

  const handleCreateThought = async () => {
    if (!session?.user?.id) {
      return;
    }
    const newThought = await thought.mutateAsync({
      text: thoughtText,
      userId: session?.user?.id,
    });
    if (newThought.id) {
      setNewThoughtId(newThought.id);
      setNewThoughtAlert(true);
      setTimeout(() => {
        setNewThoughtAlert(false);
      }, 3000);
    }
    setThoughtText("");
  };

  return (
    <Layout>
      <div className="flex flex-col bg-gray-50 h-full w-full overflow-auto rounded-lg md:shadow-lg shadow-none shadow-blue-gray-100">
        <Alert show={newThoughtAlert} link={"/thought/" + newThoughtId}>
          Your thought has been released.
        </Alert>
        <header className="flex md:flex-row flex-col gap-3 md:px-24 px-9 py-12 shadow-md shadow-blue-gray-100 z-10">
          <h1 className="text-4xl md:text-left">Hi, {session?.user?.name}.</h1>
          <h1 className="text-4xl ">How are you?</h1>
        </header>
        <main className="flex flex-col overflow-auto h-full items-center bg-[#fbfbfc] border-blue-gray-50 border">
          <div className="flex flex-col w-full h-full rounded-lg p-9">
            <textarea
              className="flex-1 resize-none px-0 w-full h-screen text-gray-800 bg-transparent text-2xl"
              value={thoughtText}
              placeholder="What are you thinking about, bud?"
              onChange={(e) => setThoughtText(e.target.value)}
            ></textarea>
            <div className="flex justify-end items-center gap-4 w-full mt-4 pr-4">
              <p className="text-xl text-[#D8D8D9] mr-auto">
                {thoughtText.length}/2000
              </p>
              <Button
                variant="gradient"
                className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                onClick={handleCreateThought}
                disabled={thoughtText.length <= 0}
              >
                Release
              </Button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
