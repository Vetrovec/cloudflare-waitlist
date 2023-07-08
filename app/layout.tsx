import "./globals.css";
import { Poppins } from "next/font/google";
import Image from "next/image";
import content from "../content.json";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: content.title,
  description: content.description,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="relative h-full">
          {content.showGithubBadge && (
            <a
              className="fixed top-0 right-0"
              href="https://github.com/Vetrovec/cloudflare-waitlist"
              target="_blank"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
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
