import React, { ReactNode } from "react";

import Link from "next/link";
import { Alert as MTAlert } from "@material-tailwind/react";

interface Props {
  link?: string;
  show: any;
  children: ReactNode;
}

const Alert = ({ link, children, ...props }: Props) => {
  {
    return link ? (
      <Link href={link as string}>
        <MTAlert
          show={props.show}
          variant="gradient"
          className="absolute left-0 right-0 md:ml-auto md:mr-9 md:mt-4 md:w-1/5 w-3/4 mt-4 ml-auto mr-auto shadow-lg z-20 hover:cursor-pointer"
        >
          <p className="hover:underline">{children}</p>
        </MTAlert>
      </Link>
    ) : (
      <MTAlert
        show={props.show}
        variant="gradient"
        className="absolute left-0 right-0 md:ml-auto md:mr-9 md:mt-4 md:w-1/5 w-3/4 mt-4 ml-auto mr-auto shadow-lg z-20"
      >
        <p>{children}</p>
      </MTAlert>
    );
  }
};

export default Alert;
