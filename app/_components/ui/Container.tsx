import { mergeClsx } from "@/helpers";
import React from "react";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainerProps) => {
  return (
    <section
      className={mergeClsx(
        "xl:max-w-[70%] lg:max-w-[80%] w-[90%] mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Container;
