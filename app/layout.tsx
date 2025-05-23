import "@/app/globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
// ❌ Remove this line:
// import Head from "next/head";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Talent Bridge - Connecting Talent with Opportunity",
  description:
    "Talent Bridge is a premier job consultancy platform connecting top talent with leading employers.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico", // ✅ Must be present in /public/favicon.ico
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ✅ Everything else remains unchanged */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>

        {/* ✅ You can keep Google Analytics scripts as is */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-E9WDN3N70T"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E9WDN3N70T', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
