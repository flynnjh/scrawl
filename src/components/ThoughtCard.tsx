import React, { ReactNode } from "react";

import Link from "next/link";
import { thought } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Props {
  thought: thought;
  key: String;
  expanded?: Boolean;
}

const ThoughtCard = ({ thought, ...props }: Props) => {
  const { data: session, status } = useSession();
  return (
    <div
      className={
        "flex flex-col w-full md:py-9 py-4 px-9 md:px-24 bg-[#fbfbfc] border-gray-300 md:border-none hover:bg-gray-200 md:rounded-md rounded-none" +
        (props.expanded ? "" : " border-b-2 md:w-4/5")
      }
    >
      <Link
        href={
          props.expanded
            ? "/user/" + session?.user?.id
            : "/thought/" + thought.id
        }
      >
        <a>
          {props.expanded ? (
            <div className="flex md:flex-row flex-col gap-4 items-center pb-6">
              <img
                className="rounded-full w-16 h-16"
                src={session?.user?.image as string}
              />
              <h1 className="text-2xl text-center md:text-left">
                {session?.user?.name} was thinking about...
              </h1>
            </div>
          ) : null}
          <h1 className="text-4xl text-center md:text-left text-clip">
            {thought.text}
          </h1>
          <p className="text-lg pt-9 text-center md:text-left">
            {props.expanded ? "@" : null} {thought.createdAt.toLocaleString()}
          </p>
        </a>
      </Link>
    </div>
  );
};

export default ThoughtCard;
