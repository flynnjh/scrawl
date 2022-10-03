import Link from "next/link";
import React from "react";

const ThoughtCard = ({ props }: any) => {
  return (
    <div className="flex flex-col w-full md:w-4/5 py-4 px-9 md:px-24 bg-blue-gray-50/70 border-gray-300 border-b-2 md:border-x-2 hover:bg-gray-200">
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
