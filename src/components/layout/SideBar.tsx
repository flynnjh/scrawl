import { FiBook, FiBookmark, FiHome, FiUser } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { MdOutlineExitToApp } from "react-icons/md";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  link?: ReactNode;
}

const SButton = ({ children, ...props }: Props) => {
  return (
    <Link href={"" + props.link}>
      <div className="flex lg:flex-row flex-col w-full py-6 cursor-pointer hover:bg-gray-600">
        <div className="flex lg:flex-row flex-col lg:justify-start justify-center lg:pl-8 lg:h-10 items-center w-full">
          {children}
        </div>
      </div>
    </Link>
  );
};

const SideBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col w-28 lg:w-96 md:w-64 overflow-auto h-screen md:shadow-lg shadow-none bg-gray-50">
      <div className="flex justify-center items-center py-16">
        <h1 className="text-black md:text-6xl text-4xl">🔏</h1>
      </div>
      <div className="flex flex-col h-full">
        <SButton link={"/"}>
          <FiHome className="w-8 h-8" />
          <a className="text-black lg:pl-4 md:text-xl text-sm">Home</a>
        </SButton>
        <SButton link={"/user/" + session?.user?.id}>
          <FiUser className="w-8 h-8" />
          <a className="text-black lg:pl-4 md:text-xl text-sm">Timeline</a>
        </SButton>
        <SButton link={"/"}>
          <FiBookmark className="w-8 h-8" />
          <a className="text-black lg:pl-4 md:text-xl text-sm">Bookmarks</a>
        </SButton>
        {session ? (
          <div className="mt-auto">
            <SButton link={"/api/auth/signout?csrf=true"}>
              <MdOutlineExitToApp className="w-8 h-8" />
              <a className="text-black lg:pl-4 md:text-xl text-sm">Sign Out</a>
            </SButton>
          </div>
        ) : null}
        {status === "loading" ? (
          <SButton>
            <a className="text-black">Loading...</a>
          </SButton>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
