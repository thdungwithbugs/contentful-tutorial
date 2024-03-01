"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "../_components/ui/Container";
import { useContentfulData } from "@/context/ContentfulData";
import { BgCircle, BgCircle2 } from "../_components/iconSvg";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { optionForContentfulFormat } from "@/settings/contentfulFormatOpt";

const Intro = () => {
  const { initContentfulData } = useContentfulData();

  // Fake list download url (set cứng img)
  const appLinkArr = initContentfulData?.introBlockDownUrl?.map(
    (url: string, index: number) => ({
      url,
      // Đúng ra sẽ check theo signal rõ ràng như typeApp là apple hay google
      img: "/images/" + (index === 0 ? "applestore.png" : "googlestore.png"),
    })
  );

  return (
    <div className="w-auto h-auto md:h-[720px] object-contain items-end isolate relative pb-20 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row gap-12 md:gap-5 items-center pt-28 md:pt-[140px]">
          <div className="flex-1 flex flex-col gap-4">
            <span className="md:text-2xl inline-block">
              The benefit we have
            </span>
            <span className="text-2xl md:text-40 font-semibold inline-block mb-10 md:mb-14 max-w-[456px]">
              {documentToReactComponents(
                initContentfulData?.introBlockTitle?.json,
                optionForContentfulFormat
              ) ?? "Revolutionize with Effortless Digital Namecard Exchange!"}
            </span>

            {appLinkArr?.length > 0 && (
              <div className="flex gap-4 md:gap-6 items-center">
                {appLinkArr?.map(
                  (app: { url: string; img: string }, index: number) => (
                    <Link target="_blank" key={app.url} href={app.url ?? "/"}>
                      <Image
                        height={100}
                        width={200}
                        quality={100}
                        alt="app down"
                        src={app.img}
                        className="object-contain h-[61px] w-[168px]"
                      />
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
          <div className="flex-1 relative">
            <Image
              height={639}
              width={639}
              alt="logo"
              quality={95}
              src={
                initContentfulData?.introBlockSideImg?.url ??
                "https://images.ctfassets.net/icj97c2sdn9i/6ZmqxYxykw4SwIIr8hhDMc/42bfc5d5e8f7098712941a8bf2d28680/Group_763.webp"
              }
              className="object-contain h-auto w-full"
            />
          </div>
        </div>
      </Container>
      <BgCircle className="w-[200px] h-[200px] md:w-[576px] md:h-[576px] absolute top-5 left-0 z-[-1] animate-pulse" />
      <BgCircle2 className="w-[300px] h-[300px] md:w-[576px] md:h-[576px] absolute top-[450px] md:top-28 right-0 z-[-1] animate-pulse" />
    </div>
  );
};

export default Intro;
