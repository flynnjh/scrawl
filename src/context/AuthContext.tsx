import React, { ReactNode } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
  children?: ReactNode;
}

// TODO: Add the ability to protect certain routes
// TODO: Actually passdown session to children

const AuthContext = ({ children, ...props }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
    return (
      <div className="flex h-screen w-full justify-center items-center text-2xl bg-blue-gray-50/70">
        <ClipLoader color="#42A5F5" size={50} />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full justify-center items-center text-2xl bg-blue-gray-50/70">
        <ClipLoader color="#42A5F5" size={50} />
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthContext;
