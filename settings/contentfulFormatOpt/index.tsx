import { ReactNode } from "react";

export const optionForContentfulFormat = {
  renderText: (text: string) => {
    return text
      .split("\n")
      .reduce(
        (children: Iterable<ReactNode>, textSegment: string, index: number) => {
          return [
            ...(children as any),
            index > 0 && <br key={index} />,
            textSegment,
          ];
        },
        []
      );
  },
};
