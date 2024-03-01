"use client";

import React, { useEffect, useRef } from "react";
import Container from "../_components/ui/Container";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import useInView from "@/hooks/useInView";

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
    <Container className="flex items-center justify-center relative py-24 md:py-20 md:mt-24">
      <Image
        height={723}
        width={168}
        quality={90}
        alt="app down"
        src={"/images/iPhone13pro.png"}
        className="object-contain h-[400px] md:h-[600px] w-auto py-10 md:py-4"
      />
      <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]">
        <div className="w-[140px] sm:w-[200px] md:w-[300px] aspect-square rounded-full bg-black/5 group absolute animate-[orbit_infinite_linear_12s]">
          <div className="absolute bg-gradient-to-br from-sky-500 to-sky-100 w-3 md:w-6 rounded-full aspect-square animate-[anti-orbit1_infinite_linear_12s]"></div>
        </div>
        <div className="w-[170px] sm:w-[230px] md:w-[400px] aspect-square rounded-full bg-black/5 absolute animate-[orbit_infinite_linear_16s]">
          <div className="absolute bg-gradient-to-br from-sky-500 to-sky-100 w-3 md:w-6 rounded-full aspect-square animate-[anti-orbit2_infinite_linear_16s]"></div>
        </div>
        <div className="w-[200px] sm:w-[260px] md:w-[500px] aspect-square rounded-full bg-black/5 absolute animate-[orbit_infinite_linear_20s]">
          <div className="absolute bg-gradient-to-br from-sky-500 to-sky-100 w-3 md:w-6 rounded-full aspect-square animate-[anti-orbit3_infinite_linear_20s]"></div>
        </div>
      </div>
      <motion.div
        className="px-6 py-4 bg-white text-primary rounded-t-full rounded-bl-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute top-2 left-0"
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
        animate={controls}
        key="divAnimate0"
      >
        <span className="max-w-[304px] inline-block text-xs md:text-sm">
          Easy way for users to create and share their business cards on the
          digital platform
        </span>
      </motion.div>
      <AnimatePresence>
        <motion.div
          className="px-6 py-4 bg-white text-primary rounded-tr-full rounded-b-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute bottom-0 md:bottom-20 right-0"
          ref={containerRef}
          key="divAnimate1"
          initial={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.1 }}
          animate={controls}
        >
          <span className="max-w-[304px] inline-block text-xs md:text-sm">
            Easy way for users to create and share their business cards on the
            digital platform
          </span>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default AnimateInto;
