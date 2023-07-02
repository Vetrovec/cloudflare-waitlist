import Image from "next/image";
import messages from "../../messages.json";

export default function HeroCover() {
  return (
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
      <h3 className="max-w-xl text-xl text-slate-700">{messages.home.subtitle}</h3>
    </div>
  );
}
