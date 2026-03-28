import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "SYNERGY 3.0 — National Level Hackathon",
  description:
    "Join SYNERGY 3.0, the ultimate national-level hackathon. Innovate, collaborate, and transform with the brightest minds in tech.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
