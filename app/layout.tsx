import type { Metadata } from "next";
import Script from "next/script";

import "@fontsource/ia-writer-quattro/400.css";
import "@fontsource/ia-writer-quattro/700.css";

import "./globals.css";
import Navbar, { INavbarItem } from "@/components/navbar";
import ClickSound from "@/components/click-sound";
import Cursor from "@/components/cursor";

export const metadata: Metadata = {
  title: "Faye Keller",
  description:
    "Enchantress of digital ecosystems; making computers behave since 2006.",
  keywords:
    "Faye Keller, Faye, Keller, Enchantress, Digital Ecosystems, Computers, Software, Programming, Web Development, Frontend, Backend, DevOps, Open Source, Notaio",

  openGraph: {
    type: "website",
    locale: "en",
    url: "https://drainpixie.xyz",
    siteName: "Faye Keller",
    title: "Faye Keller",
    description:
      "Enchantress of digital ecosystems; making computers behave since 2006.",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: INavbarItem[] = [
    { url: "/", label: "Home" },
    { url: "/blog", label: "Blog" },
    { url: "/more", label: "More" },
    { url: "/ping", label: "Ping" },
  ];

  return (
    <html lang="en">
      <body className="font-body max-w-lg">
        <Cursor />
        <ClickSound />

        <Navbar items={items} />
        <h1>Faye Keller</h1>

        <div id="content-wrapper">{children}</div>

        <Script
          src="https://stat.drainpixie.xyz/catz_r_cool.meow.js"
          data-website-id="1f4caadc-a778-474e-974d-951fd3a50a11"
        />
      </body>
    </html>
  );
}
