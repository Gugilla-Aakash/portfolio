import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aakash — I build solutions for a better tomorrow",
  description:
    "Aakash is a passionate developer turning ideas into real-world applications with focus on impact, usability, and innovation. Based in Hyderabad, India.",
  keywords: ["Aakash", "developer", "portfolio", "full-stack", "Hyderabad"],
  authors: [{ name: "Aakash" }],
  openGraph: {
    title: "Aakash — I build solutions for a better tomorrow",
    description:
      "A passionate developer who loves turning ideas into real-world applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full`}>
      <body className="min-h-full bg-[#05010f] text-[#f4f2ff] antialiased">
        {children}
      </body>
    </html>
  );
}
