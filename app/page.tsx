import { AnimateInto, CalcTool, CardList, Hero, Intro } from "./_block";

export default async function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <Hero />
      {/* Image intro SECTION */}
      <section className="flex flex-col gap-0 xl:gap-32">
        <Intro />
        <AnimateInto />
      </section>
      {/* CARD LIST SECTION */}
      <CardList />
      {/* CALCULATOR TOOL SECTION */}
      <CalcTool />
    </>
  );
}
