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

const TabBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex px-6 flex-row w-full">
      <div className="flex justify-center items-center">
        <h1 className="text-black md:text-6xl text-4xl">🔏</h1>
      </div>
      <div className="flex flex-row ml-auto gap-9 h-full">
        <SButton link={"/home"}>
          <FiHome className="w-8 h-8" />
        </SButton>
        <SButton link={"/user/" + session?.user?.id}>
          <FiUser className="w-8 h-8" />
        </SButton>
        <SButton link={"/bookmarks"}>
          <FiBookmark className="w-8 h-8" />
        </SButton>
        {session ? (
          <div className="mt-auto">
            <SButton link={"/api/auth/signout?csrf=true"}>
              <MdOutlineExitToApp className="w-8 h-8" />
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

export default TabBar;
