import { NextResponse } from "next/server";
import { DB } from "../db";
import { sendEmail } from "../lib/mail";

export const runtime = 'edge';

const errorRedirectUrl = 'http://127.0.0.1:8788/';
const successRedirectUrl = 'http://127.0.0.1:8788/';

function validateEmail(email: string) {
	const regex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,63})+$/;
	return regex.test(email);
}

function generateCode() {
	const array = new Uint32Array(4);
	crypto.getRandomValues(array);
	const sum = array.reduce((a, b) => a + b, 0);
	const value = 0xFFFFFFFF + sum;
	return value.toString(36).toUpperCase();
}

export async function POST(request: Request) {
	const data = await request.formData();
	const email = data.get('email');
	const referralCode = data.get('code');
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
		const code = generateCode();
		const result = await DB.batch([
			DB.prepare("PRAGMA foreign_keys = ON"),
			DB.prepare(`
INSERT INTO Waitlist (Email, Code, ReferredBy, CreatedAt)
SELECT ?, ?, Email, ? FROM Waitlist WHERE Code = ?
UNION ALL
SELECT ?, ?, NULL, ?
WHERE NOT EXISTS (SELECT 1 FROM Waitlist WHERE Code = ?)
ON CONFLICT (Email) DO NOTHING`)
			.bind(email, code, new Date().toISOString(), referralCode, email, code, new Date().toISOString(), referralCode)
		]);
		if (result[1]?.meta?.changes > 0) {
			await sendEmail({
				personalizations: [
					{ to: [{ email }] }
				],
				from: { email: 'info@vetrovec.com' },
				subject: 'Waitlist',
				content: [
					{ type: 'text/plain', value: `Your referral code is ${code}` }
				],
			});
		}
	} catch (e) {
		console.log(e);
		const url = new URL(errorRedirectUrl);
		url.searchParams.set('error', 'internal_error');
		return NextResponse.redirect(url, { status: 302 });
	}
	return NextResponse.redirect(successRedirectUrl, { status: 302 });
}
