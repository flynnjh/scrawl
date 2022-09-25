import React, { ReactNode } from "react";

import SideBar from "../components/SideBar";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  return (
    <main className="flex flex-row w-screen">
      <SideBar />
      {children}
    </main>
  );
};

export default Layout;
