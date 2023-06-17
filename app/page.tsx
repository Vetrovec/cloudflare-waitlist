import { redirect } from 'next/navigation';

export const runtime = 'edge';

export default function Home() {
	async function handleSubmit(data: FormData) {
		'use server';
		
		const email = data.get('email');
		redirect(`/${email}`);
	}

	return (
		<main className="h-full flex flex-col justify-center items-center gap-4">
			<h1 className="text-2xl">Waitlist</h1>
			<form className="flex gap-2" action={handleSubmit}>
				<input className="border p-2" type="email" required name="email" placeholder="Email" />
				<input className="border p-2" type="submit" value="Join" />
			</form>
		</main>
	);
}
