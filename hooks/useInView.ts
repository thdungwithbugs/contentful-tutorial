"use client";

import { MutableRefObject, useState, useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

type UseInViewParams = {
  target: MutableRefObject<null | Element>;
  options?: IntersectionObserverInit;
};

export default function useInView({
  target,
  options = {
    root: null,
    threshold: 1,
  },
}: UseInViewParams) {
  const [isInView, setIsInView] = useState(false);

  const intersectionObserverRef = useRef<null | IntersectionObserver>(null);

  const [hasEnteredView, setHasEnteredView] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!intersectionObserverRef.current) {
      const intersectionCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredView(true);
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      };

      intersectionObserverRef.current = new IntersectionObserver(
        intersectionCallback,
        options
      );
    }

    if (target.current) {
      intersectionObserverRef?.current?.observe(target.current);
    }

    return () => {
      intersectionObserverRef?.current?.disconnect();
    };
  }, [target, intersectionObserverRef, options]);

  return {
    isInView,
    hasEnteredView,
  };
}
