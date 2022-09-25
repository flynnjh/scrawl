import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import React from "react";

const you = () => {
  return (
    <>
      <Head>
        <title>fuckthebirdapp</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 gap-9">
          <Link href={"/"}>
            <a className="hover:decoration-sky-400 hover:underline">
              Back to Home.
            </a>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default you;
