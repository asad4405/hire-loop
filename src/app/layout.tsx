import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "@/components/ui/sonner";

const openSans = Open_Sans({
    variable: "--font-open-sans",
});

export const metadata: Metadata = {
    title: "HireLoop - Find Your Dream Job",
    description: "Modern job platform built with Next.js, Tailwind CSS, and Shadcn UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${openSans.variable} ${openSans.className} h-full antialiased dark`}>
            <body className="min-h-full bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 flex flex-col items-center transition-colors duration-200">
                <Navbar />
                <main className="w-full pt-20 flex-1 flex flex-col items-center">
                    {children}
                </main>
                <Toaster richColors position="bottom-right" />
            </body>
        </html>
    );
}