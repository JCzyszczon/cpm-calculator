import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Providers } from "./components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CPM Calculator",
  description: "Critical Path Method Calculator. The project was created for classes at AGH in 2024.",
  alternates: {
    canonical: 'https://cpm-calculator-omega.vercel.app',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
