import React, { ReactNode } from "react";

import Head from "next/head";
import SideBar from "./SideBar";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  return (
    <>
      <Head>
        <title>Scrawl</title>
      </Head>
      <main className="flex flex-row w-screen h-screen">
        <SideBar />
        {children}
      </main>
    </>
  );
};

export default Layout;
