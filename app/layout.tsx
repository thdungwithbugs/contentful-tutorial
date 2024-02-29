import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Footer, HeaderMenu } from "./_block";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={svnPoppins.className}>
        <HeaderMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
