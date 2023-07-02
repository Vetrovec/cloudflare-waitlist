import { SignUpForm } from "./components/SignUpForm";
import HeroCover from "./components/HeroCover";

export const runtime = "edge";

type HomeProps = {
  searchParams: {
    ref?: string;
    error?: string;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const referralCode = searchParams["ref"];
  const error = searchParams["error"];
  return (
    <main className="grid h-full grid-cols-2">
      <div className="p-16 bg-white" style={{ clipPath: 'ellipse(100% 160% at 0% 50%)' }}>
        <HeroCover />
      </div>
      <div className="flex justify-center items-center">
        <SignUpForm referralCode={referralCode} error={error} />
      </div>
    </main>
  );
}
