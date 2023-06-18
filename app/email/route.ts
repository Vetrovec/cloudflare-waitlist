import { NextResponse } from "next/server";
import { validateEmail } from "../helpers";
import { DB } from "../db";

export const runtime = 'edge';

const errorRedirectUrl = 'http://127.0.0.1:8788/';
const successRedirectUrl = 'http://127.0.0.1:8788/';

export async function POST(request: Request) {
	const data = await request.formData();
	const email = data.get('email');
	if (!email || !errorRedirectUrl) {
		const url = new URL(errorRedirectUrl);
		url.searchParams.set('error', 'bad_request');
		return NextResponse.redirect(url, { status: 302 });
	}
	if (typeof email !== 'string' || !validateEmail(email)) {
		const url = new URL(errorRedirectUrl);
		url.searchParams.set('error', 'invalid_email');
		return NextResponse.redirect(url, { status: 302 });
	}
	try {
		const statement = DB
			.prepare('INSERT INTO Waitlist (Email, CreatedAt) VALUES (?, ?)')
			.bind(email, new Date().toISOString());
		await statement.run();
	} catch {
		const url = new URL(errorRedirectUrl);
		url.searchParams.set('error', 'internal_error');
		return NextResponse.redirect(url, { status: 302 });
	}
	return NextResponse.redirect(successRedirectUrl, { status: 302 });
}
