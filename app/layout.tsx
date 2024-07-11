import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loop",
  description: "Video Calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          elements:{
            userButtonPopoverCard: 'custom-popover-card'
          },
          layout: {
            socialButtonsVariant: "iconButton",
          },
          variables: {
            fontWeight: {normal: 600},
            colorText: "black",
            colorPrimary: "#6058e8",
            colorBackground: "#fff",
            colorInputBackground: "#252a41",
            colorInputText: "#acacac",
          },
        }}
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <body className={`${inter.className} bg-[#efefef]`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
