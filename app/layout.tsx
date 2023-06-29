import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Waitlist",
  description: "Waitlist app",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative h-full">
          <a
            className="fixed top-0 right-0"
            href="https://github.com/Vetrovec/cloudflare-waitlist"
            target="_blank"
          >
            <Image
              width={80}
              height={80}
              src="/badge-github.svg"
              alt="Github"
            />
          </a>
          {children}
        </div>
      </body>
    </html>
  );
}
