import Image from "next/image";
import { SignUpForm } from "./components/SignUpForm";

export const runtime = "edge";

type HomeProps = {
  searchParams: {
    code?: string;
    error?: string;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const code = searchParams["code"];
  const error = searchParams["error"];
  return (
    <main className="grid h-full grid-cols-2">
      <div className="p-16 bg-white">
        <div
          className="flex flex-col h-full mx-auto"
          style={{ width: "600px" }}
        >
          <Image
            className="mb-6"
            width={220}
            height={44}
            src="/logo.png"
            alt="Logo"
          />
          <h1 className="mb-2 font-bold text-5xl whitespace-nowrap">
            Become an Early Adopter
          </h1>
          <h3 className="text-2xl text-slate-500">
            Don&apos;t miss out on this incredible upcoming opportunity, be part
            of something big!
          </h3>
          <Image
            className="mt-auto"
            width={520}
            height={520}
            src="/hero.png"
            alt="Hero"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <SignUpForm code={code} error={error} />
      </div>
    </main>
  );
}
