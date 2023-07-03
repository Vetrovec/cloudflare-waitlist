import { SignUpForm } from "./components/SignUpForm";
import Image from "next/image";
import messages from "../messages.json";

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
  const errorMessage = !error
    ? null
    : error in messages.errors
    ? messages.errors[error as keyof typeof messages.errors]
    : messages.errors.fallback;
  return (
    <main className="grid h-full grid-cols-2">
      <div
        className="p-16 bg-white"
        style={{ clipPath: "ellipse(100% 160% at 0% 50%)" }}
      >
        <div className="flex h-full flex-col justify-center mx-auto">
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
          <h3 className="max-w-xl text-xl text-slate-700">
            {messages.home.subtitle}
          </h3>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="p-4 bg-white rounded-2xl">
          <div className="flex flex-col">
            <div className="flex flex-col px-2 border-b">
              <h2 className="mb-1 font-semibold text-center text-2xl">
                {messages.signUpForm.title}
              </h2>
              <span className="mb-4 text-center text-xs text-slate-600">
                {messages.signUpForm.subtitle}
              </span>
            </div>
            <div className="px-2">
              <div style={{ width: "300px" }}>
                <SignUpForm referral={referral} />
                {errorMessage && (
                  <div className="mt-4 text-center text-red-500 text-sm">
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
