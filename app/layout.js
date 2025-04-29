import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/context/QueryProvider";

const heading = Inter({
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const normal = Noto_Sans({
  variable: "--font-normal",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Luxe Estate",
  description: "Luxe Estate buy luxury properties and sell luxury properties",
  keywords: ["luxury", "properties", "estate", "real estate", "luxury estate"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${normal.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
