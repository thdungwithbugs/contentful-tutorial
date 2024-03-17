"use client";

import React, { useEffect, useRef } from "react";
import Container from "../_components/ui/Container";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import useInView from "@/hooks/useInView";
import AnimateCircle from "../_components/common/AnimateCircle";

const defaultComments = [
  {
    className:
      "px-6 py-4 bg-white text-primary rounded-t-full rounded-bl-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute top-2 left-0",
    key: "divAnimate0",
    content:
      "Easy way to develop intelligence and increase reflexes on the digital platform",
  },
  {
    className:
      "px-6 py-4 bg-white text-primary rounded-tr-full rounded-b-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute bottom-0 md:bottom-20 right-0",
    key: "divAnimate1",
    content:
      "Allow users to share results to social media channels like: FB, Insta,...",
  },
];

const AnimateInto = () => {
  const containerRef = useRef(null);
  const { hasEnteredView } = useInView({
    target: containerRef,
    options: { threshold: 0.5 },
  });
  const controls = useAnimation();

  useEffect(() => {
    if (hasEnteredView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
    // return () => {
    //   controls.stop();
    // };
  }, [controls, hasEnteredView]);
  return (
    <Container className="flex items-center justify-center relative py-24 md:py-20 md:mt-24 mb-20">
      <Image
        height={500}
        width={500}
        quality={90}
        alt="app down"
        src={"/images/quiz.png"}
        className="object-contain h-[200px] md:h-[300px] aspect-square py-10 md:py-4"
      />
      <AnimateCircle />
      <AnimatePresence>
        {defaultComments.map((item) => (
          <motion.div
            className={item.className}
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.1 }}
            animate={controls}
            key={item.key}
          >
            <span className="max-w-[304px] inline-block text-xs md:text-sm">
              {item?.content}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </Container>
  );
};

export default AnimateInto;
