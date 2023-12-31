import Image from "next/image";
import SignUpForm from "@/components/SignUpForm";
import { localizeError } from "@/helpers/locale";
import messages from "@/locales/en.json";

export const runtime = "edge";

type HomeProps = {
  searchParams: {
    ref?: string;
    error?: string;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const referral = searchParams["ref"];
  const error = searchParams["error"];

  const errorMessage = error ? localizeError(error) : null;

  return (
    <main className="grid h-full xl:grid-cols-2">
      <div className="hidden xl:block p-16 bg-base background-clip-path">
        <div className="h-full flex flex-col justify-center mx-auto">
          <Image
            className="mb-8"
            width={220}
            height={44}
            src="/logo.png"
            alt="Logo"
          />
          <h1 className="mb-4 font-bold text-4xl whitespace-nowrap">
            {messages.home.title}
          </h1>
          <h3 className="max-w-xl text-xl text-gray-700">
            {messages.home.subtitle}
          </h3>
        </div>
      </div>
      <div className="flex py-10 justify-center items-center">
        <div className="p-4 bg-base rounded-2xl">
          <div className="flex flex-col">
            <div className="flex flex-col px-2 border-b">
              <h2 className="mb-1 font-semibold text-center text-2xl">
                {messages.signUpForm.title}
              </h2>
              <span className="mb-4 text-center text-xs text-gray-600">
                {messages.signUpForm.subtitle}
              </span>
            </div>
            <div className="px-2">
              <div className="container-base-width">
                <SignUpForm referral={referral} />
                {errorMessage && (
                  <div className="mt-4 text-center text-error text-sm">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
