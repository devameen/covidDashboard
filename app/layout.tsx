import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Covid Data",
  description: "DashBoard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav className="h-[8vh] bg-as-banner flex justify-end">
            <ul>
              <li>
                <span className="text-as-white font-bold antialiased">
                  {" "}
                </span>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
