import { NextResponse } from 'next/server';
import { DB } from '../db';
import { sendEmail } from '../lib/mail';

export const runtime = 'edge';

const errorRedirectUrl = process.env.ERROR_URL as string;
const successRedirectUrl = process.env.SUCCESS_URL as string;
const fromEmail = process.env.EMAIL_ADDRESS as string;

function validateEmail(email: string) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

function generateCode() {
	const array = new Uint32Array(4);
	crypto.getRandomValues(array);
	const value = array.reduce((a, b) => a + b, 0xffffffff);
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
			DB.prepare('PRAGMA foreign_keys = ON'),
			DB.prepare(
				`
INSERT INTO Waitlist (Email, Code, ReferredBy, CreatedAt)
SELECT ?, ?, Email, ? FROM Waitlist WHERE Code = ?
UNION ALL
SELECT ?, ?, NULL, ?
WHERE NOT EXISTS (SELECT 1 FROM Waitlist WHERE Code = ?)
ON CONFLICT (Email) DO NOTHING`,
			).bind(
				email,
				code,
				new Date().toISOString(),
				referralCode,
				email,
				code,
				new Date().toISOString(),
				referralCode,
			),
		]);
		let emailResult = null;
		const mailContentUrl = process.env.WELCOME_MAIL_URL;
		if (result[1]?.meta?.changes > 0 && mailContentUrl) {
			const mailContentResponse = await fetch(mailContentUrl);
			const mailContent = await mailContentResponse.text();
			emailResult = await sendEmail({
				personalizations: [
					{
						to: [{ email }],
						dkim_domain: process.env.DKIM_DOMAIN,
						dkim_selector: process.env.DKIM_SELECTOR,
						dkim_private_key: process.env.DKIM_PRIVATE_KEY,
					},
				],
				from: { email: fromEmail },
				subject: 'Waitlist',
				content: [
					{
						type: 'text/html',
						value: mailContent,
					},
				],
			});
		}
		const url = new URL(successRedirectUrl.replace('{id}', email));
		if (emailResult && !emailResult.success) {
			url.searchParams.set('email_error', JSON.stringify(emailResult));
		}
		return NextResponse.redirect(url, {
			status: 302,
		});
	} catch {
		const url = new URL(errorRedirectUrl);
		url.searchParams.set('error', 'internal_error');
		return NextResponse.redirect(url, { status: 302 });
	}
}
