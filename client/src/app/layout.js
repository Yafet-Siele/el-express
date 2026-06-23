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
  title: {
    default: "EL Express | Moving & Delivery Services",
    template: "%s | EL Express",
  },
  description:
    "Professional moving, junk removal, appliance delivery, and long-haul transportation across Alberta.",
  keywords: [
    "moving company Calgary",
    "Calgary movers",
    "junk removal",
    "delivery services",
    "long haul transport",
    "EL Express",
  ],
  authors: [{ name: "EL Express" }],
  creator: "EL Express",
  metadataBase: new URL("https://elexpress.ca"),
  openGraph: {
    title: "EL Express",
    description:
      "Professional moving and delivery services throughout Alberta.",
    url: "https://elexpress.ca",
    siteName: "EL Express",
    locale: "en_CA",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[#131313] text-white antialiased">
        {children}
      </body>
    </html>
  );
}