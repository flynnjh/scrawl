import React, { ReactNode } from "react";

import Head from "next/head";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    router.push("/public");
  }
  return (
    <>
      <Head>
        <title>Scrawl</title>
      </Head>
      <main className="flex flex-row w-screen h-screen">
        <SideBar />
        <div className="flex flex-col h-screen w-full md:p-4 md:gap-9">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
