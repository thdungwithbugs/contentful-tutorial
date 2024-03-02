"use client";

import React, { useEffect, useRef, useState } from "react";
import EmailAccessForm from "./EmailAccessForm";
import Image from "next/image";
import Container from "../_components/ui/Container";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContentfulData } from "@/context/ContentfulData";
import { optionForContentfulFormat } from "@/settings/contentfulFormatOpt";
import Typewriter from "typewriter-effect";

const defaultBgUrl =
  "https://images.ctfassets.net/icj97c2sdn9i/1e4cMN3eGsjMrCpOAUI1hl/e7a9f1ebb17de65fa0d4b93e0a50233d/Rectangle_1232.webp";

const Hero = () => {
  const { initContentfulData } = useContentfulData();
  const [isInView, setIsInView] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const formatHeroTitle = (json: Document | any) => {
    const elements = documentToReactComponents(
      json,
      optionForContentfulFormat
    ) as any;

    if (!elements) return null;
    return elements?.map((element: string, index: number) => {
      if (index === 0) {
        return (
          <span
            key={index}
            className="text-3xl md:text-5xl font-semibold text-primary block"
          >
            {element}
          </span>
        );
      } else {
        return element;
      }
    });
  };

  return (
    <section className="hero-banner">
      <div className="w-auto h-[calc(480px_+_70px)] md:h-[calc(720px_+_70px)] object-contain items-end isolate relative">
        <Image
          priority={true}
          src={initContentfulData?.heroImg?.url ?? defaultBgUrl}
          alt="hero background"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
          quality={90}
          width={1920}
          height={720}
        />
        <Container className="flex items-end h-full gap-4">
          <div className="flex-1 pb-28 md:pb-[272px]">
            <h3 className="mb-2 md:mb-4 spec-dom">
              {formatHeroTitle(initContentfulData?.heroTitle?.json) ?? (
                <>
                  <span className="text-3xl md:text-5xl font-semibold text-primary block">
                    Say goodbye
                  </span>{" "}
                  to Business cards
                </>
              )}
            </h3>
            <span
              className="inline-block mb-4 md:mb-8 typewriter-container"
              ref={containerRef}
            >
              {isInView && (
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        initContentfulData?.heroDesc ??
                          "Effortless contact exchange..."
                      )
                      .pauseFor(2000)
                      .deleteAll()
                      .start();
                  }}
                  options={{
                    loop: true,
                  }}
                />
              )}
            </span>

            <EmailAccessForm />
          </div>
          <div className="flex-1 relative hidden md:block">
            <Image
              height={639}
              width={639}
              alt="logo"
              src="/images/testimghero.png"
              className="object-contain absolute bottom-0 right-0 h-auto w-[640px]"
            />
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
