import { redirect } from 'next/navigation';
import { DB } from "../db";
import { UserDetails } from '../components/UserDetails';

export const runtime = 'edge';

export default async function Email({ params }: { params: { email: string } }) {
	const email = decodeURIComponent(params.email);
	const statement = DB
		.prepare('SELECT * FROM Waitlist WHERE Email = ?')
		.bind(email);
	const row = await statement.first();
	if (!row) {
		redirect('/');
	}
	const code = (row as any).Code;
	const createdAt = new Date((row as any).CreatedAt);
	return (
		<main className="h-full flex flex-col justify-center items-center gap-4">
			<UserDetails email={email} code={code} createdAt={createdAt} />
		</main>
	);
}