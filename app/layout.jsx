import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Lets Click It – Earn Money Online by Completing Click Tasks & Engagement Activities",
  description:
    "Lets Click It is a smart engagement platform where users can earn rewards by completing simple online tasks such as clicking sponsored links, watching promotional videos, participating in surveys, and interacting with digital campaigns. Join today to start earning through genuine engagement activities in a secure and user-friendly environment.",
  keywords: [
    "earn money online",
    "click and earn",
    "engagement tasks",
    "survey earning website",
    "watch ads and earn",
    "online rewards platform",
    "micro task earning",
    "digital engagement platform",
    "sponsored clicks earning",
    "passive income tasks",
  ],
  authors: [{ name: "Lets Click It Team" }],
  robots: "index, follow",
  charset: "UTF-8",
  openGraph: {
    title: "Lets Click It – Turn Your Clicks into Rewards",
    description:
      "Complete simple engagement tasks like clicking links, watching ads, and participating in surveys to earn rewards online. Safe, easy, and accessible from anywhere.",
    type: "website",
    url: "https://www.letsclickit.com",
    images: [
      {
        url: "https://www.letsclickit.com/og-banner.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn Online with Lets Click It",
    description:
      "Join Lets Click It and start earning by completing simple online engagement tasks anytime, anywhere.",
    images: ["https://www.letsclickit.com/twitter-banner.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
