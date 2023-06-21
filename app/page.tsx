export const runtime = 'edge';

export default function Home() {
	return (
		<main className="h-full flex flex-col justify-center items-center gap-4">
			<h1 className="text-2xl">Waitlist</h1>
			<form className="flex gap-2" action="/email" method="POST">
				<input className="border p-2" type="text" name="code" placeholder="Code" />
				<input className="border p-2" type="email" required name="email" placeholder="Email" />
				<input className="border p-2" type="submit" value="Join" />
			</form>
		</main>
	);
}
