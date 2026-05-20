import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { CartProvider } from "@/components/CartProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { VisitorCounter } from "@/components/VisitorCounter";
import { appVersion } from "@/lib/app-version";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boss Soss BBQ Sauce",
  description: "Small-batch BBQ sauces, recipes, and smokehouse favorites.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Boss Soss"
  },
  icons: {
    icon: [
      {
        url: "/icons/boss-soss-icon-32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/icons/boss-soss-icon-192.png",
        sizes: "192x192",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    shortcut: ["/icons/boss-soss-icon-32.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#9b2c13"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <VisitorCounter />
            <div className="app-version" aria-label={`Site version ${appVersion}`}>
              {appVersion}
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
