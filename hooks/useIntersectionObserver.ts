import { useEffect, useRef, MutableRefObject } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

export interface UseIntersectionObserverParams {
  callback?: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  targets:
    | MutableRefObject<null | Element>
    | MutableRefObject<null | Element>[];
}

export default function useIntersectionObserver({
  callback = () => {},
  options,
  targets,
}: UseIntersectionObserverParams) {
  const intersectionRef = useRef<null | IntersectionObserver>(null);

  useIsomorphicLayoutEffect(() => {
    intersectionRef.current = new IntersectionObserver(callback, options);

    if (Array.isArray(targets)) {
      targets.filter(Boolean).forEach((target) => {
        target.current && intersectionRef.current?.observe(target.current);
      });
    } else {
      targets.current && intersectionRef.current?.observe(targets.current);
    }

    return () => {
      intersectionRef.current?.disconnect();
    };
  }, [intersectionRef, targets, options, callback]);
}
