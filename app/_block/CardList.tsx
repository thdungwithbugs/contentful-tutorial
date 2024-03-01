"use client";

import React from "react";
import InfoCard from "../_components/ui/InfoCard";
import Container from "../_components/ui/Container";
import { useContentfulData } from "@/context/ContentfulData";

const cardIconUrlDefault =
  "https://images.ctfassets.net/icj97c2sdn9i/5tZvSx4M2npiXgoxo4C9Ts/59289c14c8ce003ab5ab01745a54c7ee/Contact_Card.webp";

const CardList = () => {
  const { initContentfulData } = useContentfulData();

  // FAKE DATA LIST CARD TỪ 1 DATA CONTENTFUL
  // EM CHƯA BIẾT CÁCH TẠO 1 MẢNG DATA TRÊN CONTENTFULL
  const cardArr = new Array(6).fill(null).map((_, index) => ({
    url: initContentfulData?.cardInfoIcon?.url ?? cardIconUrlDefault,
    name: `${initContentfulData?.cardInfoTitle ?? "Default title"} ${index}`,
    desc: `${
      initContentfulData?.cardInfoDesc ?? "This is card description default"
    } ${index}`,
  }));

  return (
    <Container className="py-20 md:py-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cardArr.slice(0, 4)?.map((item, index) => (
          <InfoCard
            key={index}
            name={item.name}
            desc={item.desc}
            icon={item.url}
          />
        ))}
        <div className="md:col-start-2 md:col-end-3">
          <InfoCard
            name={cardArr?.[4].name}
            desc={cardArr?.[4].desc}
            icon={cardArr?.[4].url}
          />
        </div>
        <div className="md:col-start-3 md:col-end-4">
          <InfoCard
            name={cardArr?.[5].name}
            desc={cardArr?.[5].desc}
            icon={cardArr?.[5].url}
          />
        </div>
      </div>
    </Container>
  );
};

export default CardList;
