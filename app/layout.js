import { Poppins, Playfair_Display } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Display face for big headings only — an elegant serif, kept restrained.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
  // Lets env(safe-area-inset-*) work so the bottom nav clears the iPhone home bar.
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col font-sans">
        <div className="flex-1 pb-28">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
