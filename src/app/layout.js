import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Narrativ — Where Good Ideas Find You",
    template: "%s | Narrativ",
  },
  description:
    "Narrativ is an open platform where readers find dynamic thinking and writing on topics that matter. Explore stories, ideas, and expert perspectives.",
  keywords: [
    "blog",
    "writing",
    "stories",
    "technology",
    "design",
    "engineering",
  ],
  authors: [{ name: "Narrativ" }],
  openGraph: {
    title: "Narrativ — Where Good Ideas Find You",
    description:
      "An open platform for insightful stories, ideas, and expert perspectives.",
    type: "website",
    locale: "en_US",
    siteName: "Narrativ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Narrativ — Where Good Ideas Find You",
    description:
      "An open platform for insightful stories, ideas, and expert perspectives.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${inter.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
