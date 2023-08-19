import Image from "next/image";
import Link from "next/link";
import ClipboardButton from "./ClipboardButton";
import appConfig from "@/app-config.json";
import { env } from "@/env.client.mjs";
import messages from "@/locales/en.json";

interface UserDetailsProps {
  email: string;
  errorMessage?: string | null;
  referralCode: string;
  createdAt: Date;
}

export default function UserDetails({
  email,
  errorMessage,
  referralCode,
  createdAt,
}: UserDetailsProps) {
  const referralUrl = new URL(env.BASE_URL);
  referralUrl.searchParams.set("ref", referralCode);
  return (
    <div className="relative p-6 rounded-2xl mt-10 bg-base">
      <div className="absolute top-0 inset-x-1/2 transform -translate-x-2/4 -translate-y-2/4 w-20 h-20 flex justify-center items-center rounded-full bg-base">
        <Image
          className="rounded-full"
          width={72}
          height={72}
          src="/logo-small.png"
          alt="Logo"
        />
      </div>
      <div className="container-base-width">
        <div className="pt-4">
          <h2 className="mb-2 font-semibold text-2xl text-center">
            {messages.userDetails.title}
          </h2>
          <div className="mb-1 font-semibold text-center text-gray-800 text-xs">
            {email}
          </div>
          <div className="mb-4 text-center text-gray-800 text-xs">
            {messages.userDetails.joinedAt}
            <span className="font-semibold">
              &nbsp;{createdAt.toLocaleDateString()}
            </span>
          </div>
        </div>
        {errorMessage && (
          <div className="px-2 py-4 border-t">
            <div className="text-center text-error text-xs">{errorMessage}</div>
          </div>
        )}
        <div className="flex flex-col items-center px-2 py-4 border-t gap-4">
          <span className="text-xs">{messages.userDetails.refer}</span>
          <div className="relative w-full flex items-center">
            <input
              className="w-full h-10 border p-2 pr-8 rounded-lg bg-gray-100 text-xs"
              disabled
              value={referralUrl.toString()}
            />
            <div className="absolute right-2">
              <ClipboardButton content={referralUrl.toString()} />
            </div>
          </div>
          <span className="text-xs">{messages.userDetails.or}</span>
          <Link
            className="relative flex w-fit h-10 items-center pl-10 pr-6 py-2 border rounded-lg transition-colors hover:bg-gray-100"
            href="/"
          >
            <div className="absolute left-4">
              <Image width={12} height={12} src="/icons/back.svg" alt="Back" />
            </div>
            <span className="text-gray-800 text-sm">
              {messages.userDetails.goBack}
            </span>
          </Link>
        </div>
        {appConfig.socials.length > 0 && (
          <div className="flex flex-col items-center border-t pt-6 gap-2">
            <span className="text-gray-800 text-xs">
              {messages.userDetails.getInTouch}
            </span>
            <div className="flex gap-4">
              {appConfig.socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank">
                  <Image
                    width={24}
                    height={24}
                    src={social.icon}
                    alt={social.name}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
