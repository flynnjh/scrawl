import React, { ReactNode } from "react";

import AuthContext from "../../context/AuthContext";
import Head from "next/head";
import SideBar from "./SideBar";

interface Props {
  children?: ReactNode;
}

// FIXME: Added AuthContext to Layout for the time being, this way routes that utilise it will be protected.

const Layout = ({ children, ...props }: Props) => {
  return (
    <AuthContext>
      <Head>
        <title>Scrawl</title>
      </Head>
      <main className="flex flex-row w-screen h-screen">
        <SideBar />
        <div className="flex flex-col h-screen w-full md:p-4 md:gap-9">
          {children}
        </div>
      </main>
    </AuthContext>
  );
};

export default Layout;
