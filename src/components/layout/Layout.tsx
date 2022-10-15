import React, { ReactNode } from "react";

import Head from "next/head";
import RouteContext from "../../context/RouteContext";
import SideBar from "./SideBar";
import TabBar from "./TabBar";
import useMediaQuery from "../../hooks/useMediaQuery";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  const isMobile = useMediaQuery(550);
  return (
    <RouteContext>
      <Head>
        <title>Scrawl</title>
      </Head>
      <main className="flex w-screen h-screen">
        {!isMobile ? (
          <div className="flex flex-row h-screen w-full md:px-6 md:py-9 md:gap-9 2xl:ml-24 2xl:mr-24">
            <SideBar />
            {children}
          </div>
        ) : (
          <div className="flex flex-col h-screen w-screen">
            {children}
            <TabBar />
          </div>
        )}
      </main>
    </RouteContext>
  );
};

export default Layout;
