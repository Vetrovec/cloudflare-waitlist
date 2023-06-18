import { DB } from "../db";

export const runtime = 'edge';

export default async function Email({ params }: { params: { email: string }}) {
	const email = decodeURIComponent(params.email);
	const statement = DB
		.prepare('SELECT * FROM Waitlist WHERE Email = ?')
		.bind(email);
	const row = await statement.first();
	if (!row) {
		return (
			<p>Not found</p>
		);
	}
	const createdAt = new Date((row as any).CreatedAt);
	return (
		<main className="h-full flex flex-col justify-center items-center gap-4">
			<h1 className="text-2xl">Waitlist</h1>
			<p>You were signed up {createdAt.toLocaleDateString()}</p>
		</main>
	);
}