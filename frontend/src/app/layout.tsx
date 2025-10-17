"use client";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/navigation/sidebar/Sidebar";
import TopNav from "@/components/navigation/topNavbar/TopNav";
import { useState } from "react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// export const metadata: Metadata = {
//   title: "Learner",
//   description: "An AI Astronomy agent",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [isActive, showSidebar] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="flex flex-row">
            <div className={`${isActive ? "w-3/4" : "md:w-2/6"}`}>
              <button
                type="button"
                className="md:hidden inline-flex items-center p-2 mt-2 ms-3 text-sm text-primary rounded-lg bg-gray-100 fixed z-10"
                onClick={() => showSidebar((prevState) => !prevState)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <div className={`w-full ${isActive ? "fixed" : "max-md:hidden"}`}>
                <Sidebar />
              </div>
            </div>
            <main className="w-full p-6 mt-8">
              <div>{children}</div>
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
