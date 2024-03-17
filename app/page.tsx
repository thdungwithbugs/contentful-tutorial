import { Metadata, ResolvingMetadata } from "next";
import { AnimateInto, Hero, Intro } from "./_block";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const openGraphImage = {
  images: [
    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Test Coding with Quiz by HDung",
    description: "This is a simple website by HDung",
    openGraph: {
      ...openGraphImage,
      title: "Quiz w Nextjs 14 by HDung",
      description: "This simple page was coded by HDung with NextJS 14",
      type: "website",
    },
  };
}

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
    </>
  );
}
