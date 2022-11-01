import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Alert from "../../components/Alert";
import { Button } from "@material-tailwind/react";
import { FiGithub } from "react-icons/fi";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

// Below is some of the worst code I've ever written, just utter spaghetti. I'm very tried and want to be done this project already.

const Settings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const username = trpc.useMutation(["user.updateName"]);
  const trpcDeleteAccount = trpc.useMutation(["user.delete"]);

  const [newName, setNewName] = useState(String);
  const [newNameAlert, setNewNameAlert] = useState(Boolean);
  const [accountDeleted, setAccountDeleted] = useState(Boolean);

  const updateName = async (desiredName: string) => {
    if (!session?.user?.id) {
      console.log("ffs");
      return;
    }
    await username
      .mutateAsync({
        userId: session?.user.id,
        name: desiredName,
      })
      .then(() => {
        setNewNameAlert(true);
        setTimeout(() => {
          setNewNameAlert(false);
        }, 3000);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteAccount = async (userId: string) => {
    if (!session?.user?.id) {
      return;
    }
    await trpcDeleteAccount
      .mutateAsync({ userId: userId })
      .then(() => {
        setAccountDeleted(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      {!accountDeleted ? (
        <Layout>
          <div className="flex flex-col bg-gray-50 h-full w-full overflow-auto rounded-lg md:shadow-lg shadow-none shadow-blue-gray-100">
            <Alert show={newNameAlert}>Your name has been updated.</Alert>
            <header className="flex flex-col gap-4 md:px-24 px-9 py-12 shadow-md shadow-blue-gray-100 z-10">
              <h1 className="text-4xl text-left">Settings</h1>
              <p className="flex w-full h-full md:text-left text-gray-600 text-lg">
                p.s. Scrawl is open source under the MIT License. You can view
                it&apos;s source on GitHub.
              </p>
            </header>
            <main className="flex flex-col overflow-auto h-full items-center bg-[#fbfbfc] border-blue-gray-50 border">
              <div className="flex flex-col w-full h-full rounded-lg p-9">
                <div className="flex flex-col w-full border-b-2 pb-9">
                  <h1 className="text-3xl">Sign Out</h1>
                  <p className="text-gray-800 text-lg pt-4 pb-8">
                    If you would like to sign out of Scrawl, click the button
                    below.
                  </p>
                  <div>
                    <Button
                      variant="gradient"
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col w-full border-b-2 py-9">
                  <h1 className="text-3xl">Change Name</h1>
                  <p className="text-gray-800 text-lg pt-4 pb-4">
                    This app uses GitHub oAuth for user information like your
                    name and profile picture. If you have to use a deadname or
                    name you are not comfortable with on GitHub, you can change
                    the name the appears on Scrawl here.
                  </p>
                  <p className="text-gray-800 text-lg pt-4 pb-8">
                    You may need to refresh the page before the changes take
                    affect.
                  </p>
                  <textarea
                    placeholder="Enter your name here..."
                    className="flex-1 resize-none px-4 pt-5 w-full h-screen text-gray-800 bg-gray-100 text-xl rounded-md"
                    onChange={(e) => setNewName(e.target.value)}
                  ></textarea>
                  <div className="pt-8">
                    <Button
                      variant="gradient"
                      onClick={() => {
                        updateName(newName);
                      }}
                    >
                      Change Name
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col w-full py-9">
                  <h1 className="text-3xl">Delete Account</h1>
                  <p className="text-gray-800 text-lg pt-4 pb-8">
                    If you have decided that Scrawl is no longer worth your
                    time, no worries, you can delete your account with the
                    button below.
                  </p>
                  <div>
                    <Button
                      variant="gradient"
                      color="red"
                      onClick={() => {
                        deleteAccount(session?.user?.id as string);
                      }}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Layout>
      ) : (
        <div className="flex flex-col h-screen w-full">
          <div className="flex flex-col h-full items-center md:items-start justify-center md:justify-start md:p-9">
            <h1 className="text-lg text-center">
              Your account has been deleted.
            </h1>
            <h1 className="text-lg text-center">Safe travels.</h1>
          </div>
          <div className="flex flex-row w-full p-9 items-center">
            <p>
              You can visit Scrawl&apos;s source code on GitHub or close this
              tab.
            </p>
            <Link href="https://github.com/flynnjh/scrawl">
              <FiGithub className="w-12 h-12 hover:cursor-pointer ml-auto" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
