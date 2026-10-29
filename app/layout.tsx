import type { Metadata } from "next";
import "./globals.css";
import "./hero.css";
import "./site.css";

export const metadata: Metadata = {
  title: "Adarsh Prakasan — Designer & Developer",
  description:
    "Portfolio of Adarsh Prakasan — UI/UX and graphic designer, and full-stack (MERN) developer based in Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;800&family=DM+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
