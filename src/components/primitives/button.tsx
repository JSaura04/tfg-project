import { cn } from "@sglara/cn";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    className?: string;
    href?: string;
  };

export const Button: React.FC<ButtonProps> = ({
  className,
  href,
  children,
  ...props
}) => {
  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cn("p-4 rounded-b-md pointer", className)} {...props}>
      {children}
    </button>
  );
};
