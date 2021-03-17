import Link from "next/link";
import React from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  prefetch?: boolean;
}

export const A = React.forwardRef(
  ({ prefetch, className, ...props }: LinkProps, ref: any) => {
    return (
      <Link href={props.href!} prefetch={prefetch || false}>
        <a className={`text-blue-700 ${className}`} {...props} ref={ref} />
      </Link>
    );
  }
);
