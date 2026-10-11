import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

export const metadata = {
  title: {
    default: "Health Calendar 2027",
    template: "%s · Health Calendar 2027",
  },
  description:
    "Scan, explore and learn — monthly health observances, a quiz for every month and your 2027 horoscope.",
};

export const viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col font-sans">
        <div className="flex-1 pb-28">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
