import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LaserCursor } from "./components/GlitchOverlay";
import { RegisterButton } from "./components/RegisterButton";
import { BackgroundAudio } from "./components/BackgroundAudio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <BackgroundAudio />
        <LaserCursor />
        <RegisterButton />
        {children}
      </body>
    </html>
  );
}
