import { Alert, Button } from "@material-tailwind/react";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import Layout from "../components/layout/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home: NextPage = () => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const { data: session, status } = useSession();
  const router = useRouter();

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
    <>
      <Layout>
        {/* Save shadow and color variables in a separate document to start forming a style guide */}
        <div className="flex flex-col bg-gray-50 h-full w-full overflow-auto rounded-lg md:shadow-lg shadow-none shadow-blue-gray-100">
          <Alert
            show={newThoughtAlert}
            variant="gradient"
            className="absolute left-0 right-0 md:ml-auto md:mr-9 md:mt-4 md:w-1/5 w-3/4 mt-4 ml-auto mr-auto shadow-lg"
          >
            Your{" "}
            <Link href={"/thought/" + newThoughtId}>
              <a className="hover:underline">thought</a>
            </Link>{" "}
            has been released.
          </Alert>
          <div className="flex gap-4 md:px-24 px-24 py-12 shadow-md shadow-blue-gray-100 z-10">
            {/* Color this shadow more effectively */}
            <h1 className="text-4xl text-left">
              Hi, {session?.user?.name}. How are you?
            </h1>
          </div>
          <div className="flex flex-col overflow-auto h-full items-center bg-[#fbfbfc] border-blue-gray-50 border">
            <div className="flex flex-col w-full h-full rounded-lg p-9">
              <textarea
                className="flex-1 resize-none px-0 w-full h-screen text-gray-800 bg-transparent text-2xl"
                value={thoughtText}
                placeholder="What are you thinking about, bud?"
                onChange={(e) => setThoughtText(e.target.value)}
              ></textarea>
              <div className="flex justify-end gap-4 w-full mt-4 pr-4">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button>
                    <Button
                      variant="gradient"
                      color="blue-gray"
                      className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                    >
                      More
                    </Button>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                alert("save as draft does nothing! :3");
                                // I have yet to implement the draft system
                              }}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Save as Draft
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                setThoughtText("");
                                // Add a popup telling the user their thought has vanished
                              }}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Button
                  variant="gradient"
                  className="flex justify-end text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-md"
                  onClick={handleCreateThought}
                >
                  Release
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
