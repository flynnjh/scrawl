import Link from "next/link";
import React from "react";

const ThoughtCard = ({ props }: any) => {
  console.log(props);
  return (
    <div className="flex flex-col md:w-5/6 w-full py-4 bg-gray-50 p-24 border-gray-200 border-b-2 md:border-x-2 hover:bg-gray-200">
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
