import {
  MdBookmark,
  MdHome,
  MdOutlineExitToApp,
  MdPerson,
} from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
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
          <MdHome className="w-12 h-12" />
          <a className="text-black lg:pl-4 md:text-xl">Home</a>
        </SButton>
        <SButton link={"/user/" + session?.user?.id}>
          <MdPerson className="w-12 h-12" />
          <a className="text-black lg:pl-4 md:text-xl">Timeline</a>
        </SButton>
        <SButton link={"/404"}>
          <MdBookmark className="w-12 h-12 rounded-full" />
          <a className="text-black lg:pl-4 md:text-xl">Bookmarks</a>
        </SButton>
        {session ? (
          <div className="mt-auto">
            <SButton link={"/api/auth/signout?csrf=true"}>
              <MdOutlineExitToApp className="w-12 h-12" />
              <a className="text-black lg:pl-4 md:text-xl">Sign Out</a>
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
