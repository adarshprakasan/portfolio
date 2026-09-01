import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adarsh Prakasan — Designer × Developer",
  description: "Portfolio of Adarsh Prakasan — graphic designer, UI/UX designer and full-stack developer."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
