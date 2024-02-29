import React from "react";
import Button from "../_components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import Container from "../_components/ui/Container";

const HeaderMenu = () => {
  return (
    <header className="bg-white">
      <Container>
        <nav
          className="flex items-center justify-between p-[calc((96px-57px)/2)] lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
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
            <span className="hidden sm:inline-block">Ready to changing?</span>
            <Button className="px-4 py-2 md:px-[34px] md:py-4 rounded-md md:rounded-full border border-primary text-primary shadow-md group relative overflow-hidden transition-all bg-white">
              <span className="group-hover:text-white relative">
                Insta Benefit
              </span>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default HeaderMenu;
