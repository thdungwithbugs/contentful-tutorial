import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Footer, HeaderMenu } from "./_block";
import { ContentfulDataProvider } from "@/context/ContentfulData";
import { defaultConfig } from "next/dist/server/config-shared";
import { contentfulQuery, graphQlContentfulUrl } from "@/settings/api";

const svnPoppins = localFont({
  src: [
    {
      path: "./_fonts/poppins/SVN-Poppins.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/poppins/SVN-PoppinsBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./_fonts/poppins/SVN-PoppinsMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_fonts/poppins/SVN-PoppinsSemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Coding test by HDung",
  description: "Coding test by HDung desc",
};

// const client = contentful.createClient({
//   space: process.env.CONTENTFUL_SPACE_ID!,
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
// });

export const revalidate = 3600;

export async function fetchGetEntry() {
  try {
    const response = await fetch(graphQlContentfulUrl, {
      method: "POST",
      body: JSON.stringify({ query: contentfulQuery }),
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentfulData = await fetchGetEntry();

  return (
    <html lang="en">
      <body className={svnPoppins.className}>
        <ContentfulDataProvider
          initContentfulData={contentfulData?.data?.instaCardCodingTest}
        >
          <HeaderMenu />
          {children}
          <Footer />
        </ContentfulDataProvider>
      </body>
    </html>
  );
}
