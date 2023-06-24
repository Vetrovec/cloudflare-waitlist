'use client';

import Script from "next/script";

type TurnstileProps = {
	siteKey: string;
};

export function Turnstile({ siteKey }: TurnstileProps) {
	return (
		<>
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
				async={true}
				defer={true}
			/>
			<div
				className="cf-turnstile"
				data-sitekey={siteKey}
			/>
		</>
	)
}
