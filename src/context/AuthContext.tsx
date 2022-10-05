import React, { ReactNode } from "react";

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
    router.push("/public");
    return <div className="bg-blue-gray-50/70"></div>;
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full justify-center items-center text-2xl bg-blue-gray-50/70">
        Loading...
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthContext;
