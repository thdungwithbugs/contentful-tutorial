import Image from "next/image";
import Container from "./_components/ui/Container";
import { CalcTool, EmailAccessForm } from "./_block";
import Link from "next/link";
import InfoCard from "./_components/ui/InfoCard";
import * as contentful from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});
const query = `query{
  instaCardCodingTest(id:"7xDztcFkia7tlO3CYqd3vj"){
    heroTitle{
      json
    }
    heroDesc
    heroBtnLink
    heroImg{
      title
      url
    }
    introBlockTitle{
      json
    }
    introBlockDownUrl
    introBlockSideImg{
      url
      title
    }
    cardInfoTitle
    cardInfoDesc
    cardInfoIcon{
      title
      url
    }
  }
}`;
const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`;

export const revalidate = 3600;

export async function fetchGetEntry() {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
  }
}

const MailIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
    >
      <path
        d="M3.25 0H16.75C18.483 0 19.8992 1.35645 19.9949 3.06558L20 3.25V12.75C20 14.483 18.6435 15.8992 16.9344 15.9949L16.75 16H3.25C1.51697 16 0.100754 14.6435 0.00514483 12.9344L0 12.75V3.25C0 1.51697 1.35645 0.100754 3.06558 0.0051446L3.25 0H16.75H3.25ZM18.5 5.373L10.3493 9.66369C10.1619 9.76233 9.94313 9.77642 9.74676 9.70596L9.65069 9.66369L1.5 5.374V12.75C1.5 13.6682 2.20711 14.4212 3.10647 14.4942L3.25 14.5H16.75C17.6682 14.5 18.4212 13.7929 18.4942 12.8935L18.5 12.75V5.373ZM16.75 1.5H3.25C2.33183 1.5 1.57881 2.20711 1.5058 3.10647L1.5 3.25V3.679L10 8.15246L18.5 3.678V3.25C18.5 2.33183 17.7929 1.57881 16.8935 1.5058L16.75 1.5Z"
        fill="#9A9EA6"
      />
    </svg>
  );
};

const BgCircle = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="576"
      height="576"
      viewBox="0 0 739 838"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_f_1_649)">
        <circle cx="320" cy="419" r="288" fill="#ABE1F2" fillOpacity="0.3" />
      </g>
      <defs>
        <filter
          id="filter0_f_1_649"
          x="-99"
          y="0"
          width="838"
          height="838"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="65.5"
            result="effect1_foregroundBlur_1_649"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default async function Home() {
  const res = await fetchGetEntry();

  console.log("🚀 ~ Home ~ res:", res);
  // const {
  //   instaCardCodingTest: { heroTitle, heroDesc, heroBtnLink, heroImg },
  // } = res?.data;

  const appLinkArr = [
    {
      url: "https://images.unsplash.com/photo-1708861177937-70c66c166609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
    },
    {
      url: "https://images.unsplash.com/photo-1708936120323-4f34ce5284b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    },
  ];

  const cardArr = [
    {
      url: "https://images.unsplash.com/photo-1708861177937-70c66c166609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
      name: "Simple",
      desc: "No app download required",
    },
    {
      url: "https://images.unsplash.com/photo-1708861177937-70c66c166609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
      name: "Simple",
      desc: "No app download required",
    },
    {
      url: "https://images.unsplash.com/photo-1708861177937-70c66c166609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
      name: "Simple",
      desc: "Save cards in languages you can’t type",
    },
    {
      url: "https://images.unsplash.com/photo-1708861177937-70c66c166609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
      name: "Simple",
      desc: "No app download required",
    },
    {
      url: "https://images.unsplash.com/photo-1708861177937-70c66c166609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
      name: "Simple",
      desc: "No app download required",
    },
    {
      url: "https://images.unsplash.com/photo-1708861177937-70c66c166609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
      name: "Simple",
      desc: "No app download required",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      {/* <section>
        <div className="w-auto h-[480px] md:h-[720px] object-contain items-end isolate relative">
          <Image
            priority={true}
            src={heroImg.url}
            alt="hero background"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            quality={90}
            width={1920}
            height={720}
          />
          <Container className="flex items-end h-full gap-4">
            <div className="flex-1 pb-28 md:pb-[272px]">
              <h3 className="mb-2 md:mb-4">
                {documentToReactComponents(heroTitle.json)}
              </h3>
              <span className="inline-block mb-4 md:mb-8">{heroDesc}</span>

              <EmailAccessForm />
            </div>
            <div className="flex-1 relative hidden md:block">
              <Image
                height={639}
                width={639}
                alt="logo"
                src="/images/testimghero.png"
                className="object-contain absolute bottom-0 right-0 h-auto w-full"
              />
            </div>
          </Container>
        </div>
      </section> */}

      {/* Image intro SECTION */}
      <section>
        <div className="w-auto h-auto md:h-[720px] object-contain items-end isolate relative pb-20">
          <Image
            priority={true}
            src={
              "https://images.unsplash.com/photo-1707343848610-16f9afe1ae23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="img"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            quality={90}
            width={1920}
            height={720}
          />
          <Container>
            <div className="flex flex-col md:flex-row gap-12 md:gap-5 items-center pt-28 md:pt-[140px]">
              <div className="flex-1">
                <span className="md:text-2xl inline-block mb-4">
                  The benefit we have
                </span>
                <span className="text-2xl md:text-40 font-semibold inline-block mb-10 md:mb-14">
                  Revolutionize with Effortless Digital Namecard Exchange!
                </span>

                {appLinkArr?.length > 0 && (
                  <div className="flex gap-4 md:gap-6 items-center">
                    {appLinkArr?.map((app, index) => (
                      <Link target="_blank" key={app.url} href={"/"}>
                        <Image
                          height={61}
                          width={168}
                          alt="app down"
                          src={app.url}
                          className="object-contain h-[61px] w-[168px]"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Image
                  height={639}
                  width={639}
                  alt="logo"
                  src="/images/testimghero.png"
                  className="object-contain h-auto w-full"
                />
              </div>
            </div>
          </Container>
          <BgCircle className="w-[200px] h-[200px] md:w-[576px] md:h-[576px] absolute top-5 left-0" />
        </div>
        <Container className="flex items-center justify-center relative py-24">
          <Image
            height={723}
            width={168}
            quality={90}
            alt="app down"
            src={"/images/iPhone13pro.png"}
            className="object-contain h-[400px] md:h-[600px] w-auto py-10 md:py-4"
          />
          <div className="px-6 py-4 bg-white text-primary rounded-t-full rounded-bl-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute top-2 left-0">
            <span className="max-w-[304px] inline-block text-xs md:text-sm">
              Easy way for users to create and share their business cards on the
              digital platform
            </span>
          </div>
          <div className="px-6 py-4 bg-white text-primary rounded-tr-full rounded-b-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute bottom-0 md:bottom-20 right-0">
            <span className="max-w-[304px] inline-block text-xs md:text-sm">
              Easy way for users to create and share their business cards on the
              digital platform
            </span>
          </div>
        </Container>
      </section>

      {/* CARD LIST SECTION */}
      <Container className="py-20 md:py-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cardArr.slice(0, 4)?.map((item, index) => (
            <InfoCard key={item.url} name={item.name} desc={item.desc} />
          ))}
          <div className="md:col-start-2 md:col-end-3">
            <InfoCard name={cardArr?.[4].name} desc={cardArr?.[4].desc} />
          </div>
          <div className="md:col-start-3 md:col-end-4">
            <InfoCard name={cardArr?.[5].name} desc={cardArr?.[5].desc} />
          </div>
        </div>
      </Container>

      {/* CALCULATOR TOOL SECTION */}
      <CalcTool />
    </>

    // <main>
    //   {data.items.map((blog: any, index: number) => {
    //     const image = data.includes.Asset.find(
    //       (asset: any) => asset.sys.id === blog.fields.image.sys.id
    //     );
    //     const authorEntry = data.includes.Entry.find(
    //       (entry: any) => entry.sys.id === blog.fields.author.sys.id
    //     );
    //     const authorImage = data.includes.Asset.find(
    //       (auth: any) => auth.sys.id === authorEntry.fields.authorImage.sys.id
    //     );

    //     return (
    //       <div key={index} className="px-24 mx-auto">
    //         <h1 className="text-3xl font-bold py-4 ">{blog.fields.title}</h1>
    //         <div className="py-4 ">
    //           {documentToReactComponents(blog.fields.body)}
    //         </div>
    //         <Image
    //           src={"https:" + image.fields.file.url}
    //           width={500}
    //           height={500}
    //           alt="blogimage"
    //         />
    //         <div className=" flex gap-2 mt-10 items-center">
    //           <Image
    //             src={"https:" + authorImage.fields.file.url}
    //             width={500}
    //             height={500}
    //             alt="author"
    //             className="h-16 w-16 rounded-full object-cover"
    //           />
    //           <h4>{authorEntry.fields.authorName}</h4>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </main>
  );
}
