import Script from "next/script";
import { Turnstile } from "./components/Turnstile";

export const runtime = 'edge';

export default function Home({ searchParams }: any) {
	const code = searchParams['code'];
	return (
		<main className="h-full flex flex-col justify-center items-center gap-4">
			<h1 className="text-2xl">Waitlist</h1>
			<form className="flex gap-2" action="/email" method="POST">
				<input hidden name="code" value={code} />
				<input className="border p-2" type="email" required name="email" placeholder="Email" />
				<Turnstile siteKey="0x4AAAAAAAGe7L2vRCTnleMg" />
				<input className="border p-2" type="submit" value="Join" />
			</form>
		</main>
	);
}
