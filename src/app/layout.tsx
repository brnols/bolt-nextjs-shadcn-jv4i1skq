import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import PrimeProvider from "@/lib/providers";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Área de membros",
    description: "Área de membros",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${rubik.className} antialiased  bg-white`}>
                <PrimeProvider>
                    {children}
                </PrimeProvider>
                <Toaster />
            </body>
        </html>
    );
}
