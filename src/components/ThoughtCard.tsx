import Link from "next/link";
import React from "react";

const ThoughtCard = ({ props }: any) => {
  return (
    <div className="flex flex-col w-full md:w-4/5 md:py-9 py-4 px-9 md:px-24 bg-white border-gray-300 md:border-none border-b-2 hover:bg-gray-200 md:rounded-md rounded-none">
      <Link href={"/thought/" + props.id}>
        <a>
          <h1 className="text-4xl">{props.text}</h1>
          <p className="text-lg pt-9">{props.createdAt.toLocaleString()}</p>
        </a>
      </Link>
    </div>
  );
};

export default ThoughtCard;
