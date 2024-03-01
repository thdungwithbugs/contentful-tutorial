"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ContentfulDataContextProps = any;

const ContentfulDataContext = createContext<ContentfulDataContextProps>({});

export const ContentfulDataProvider = ({
  children,
  initContentfulData,
}: {
  children: React.ReactNode;
  initContentfulData: { [key: string]: string };
}) => {
  const contextValue = {
    initContentfulData,
  };

  return (
    <ContentfulDataContext.Provider value={contextValue}>
      {children}
    </ContentfulDataContext.Provider>
  );
};

export const useContentfulData = () => useContext(ContentfulDataContext);
