"use client";

import React, { useRef, useState } from "react";
import Button from "../_components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import Container from "../_components/ui/Container";
import { mergeClsx } from "@/helpers";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const HeaderMenu = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  const bufferRef = useRef<null | HTMLDivElement>(null);

  useIntersectionObserver({
    callback: (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setIsTransparent(false);
        } else {
          setIsTransparent(true);
        }
      });
    },
    options: {
      root: null,
      threshold: 1,
    },
    targets: [bufferRef],
  });

  return (
    <>
      <header
        className={mergeClsx(
          "bg-white w-full fixed z-10 top-0 left-1/2 -translate-x-1/2 duration-700 ease-out transition-all",
          isTransparent ? "w-full" : "md:w-[80%] md:rounded-lg shadow-md"
        )}
      >
        <Container>
          <nav
            className="flex items-center justify-between py-[calc((96px-57px)/2)] "
            aria-label="Global"
          >
            <div className="flex">
              <Link href="/" className="-m-1.5 p-1.5">
                <Image
                  height={20}
                  width={125}
                  alt="logo"
                  src="/images/logo.jpg"
                  className="object-contain"
                />
              </Link>
            </div>
            <div className="flex gap-3 md:gap-6 flex-1 justify-end items-center font-medium">
              <span className="hidden sm:inline-block text-md xl:text-lg">
                Ready to changing?
              </span>
              <Button className="px-4 py-2 md:px-[34px] md:py-4 rounded-md md:rounded-full border border-primary text-primary shadow-md group relative overflow-hidden transition-all bg-white">
                <span className="group-hover:text-white relative text-md xl:text-lg">
                  Insta Benefit
                </span>
              </Button>
            </div>
          </nav>
        </Container>
      </header>
      <div
        aria-hidden
        ref={bufferRef}
        className={mergeClsx("h-0", "hidden md:block w-full")}
      />
    </>
  );
};

export default HeaderMenu;
