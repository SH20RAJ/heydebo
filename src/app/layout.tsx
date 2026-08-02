import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PWAProvider } from "@/components/pwa/pwa-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "heydebo OS | Ultimate Student Life Operating System & Second Brain",
	description: "Automated decision engine, Apple Watch OS aesthetics, Google DSA roadmap, 5-day Calisthenics split, and subject dashboards.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="manifest" href="/manifest.webmanifest" />
				<meta name="theme-color" content="#00F0FF" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090a0f] text-white selection:bg-cyan-500 selection:text-black`}>
				<PWAProvider>
					<TooltipProvider>
						{children}
					</TooltipProvider>
				</PWAProvider>
			</body>
		</html>
	);
}
