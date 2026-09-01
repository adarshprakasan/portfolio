import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

export const metadata: Metadata = {
  title: "Adarsh Prakasan — Designer × Developer",
  description: "Portfolio of Adarsh Prakasan — graphic designer, UI/UX designer and full-stack developer."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}</body>
    </html>
  );
}
