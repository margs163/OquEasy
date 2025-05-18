import "./globals.css";
import Link from "next/link";
import Navbar from "./ui/navbar";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "Main Page prototype",
  description: "A page prototype of main course page",
};

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const tabs = [
  { href: "/#", label: "Course" },
  { href: "/algorithms", label: "Sorting Algorithms" },
  { href: "/heapsort", label: "Heap Sort" },
  { href: "/theory", label: "Theory" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased bg-white`}>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
