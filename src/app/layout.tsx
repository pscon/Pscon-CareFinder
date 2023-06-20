import "./globals.css";
import { Providers } from "./GlobalRedux/provider";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pscon-CareFinder",
  description: "Making Care Connections Seamless and Simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <Providers>
        <html lang="en" className={inter.className}>
          <Head>
            <meta charSet="utf-8" />
          </Head>
          <body>
            <Navbar />
            {children}
            <Footer />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
