import "../globals.css";
import { Metadata } from "next";
import Image from "next/image";
import { Poppins } from "next/font/google";
import appConfig from "@/app-config.json";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="relative h-full">
          {appConfig.showGithubBadge && (
            <a
              className="fixed top-0 right-0 triangle-clip-path"
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
          )}
          {children}
        </div>
      </body>
    </html>
  );
}
