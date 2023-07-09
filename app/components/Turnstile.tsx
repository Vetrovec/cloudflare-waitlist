import Script from "next/script";

interface TurnstileProps {
  siteKey: string;
}

export function Turnstile({ siteKey }: TurnstileProps) {
  return (
    <div className="turnstile-height">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        defer={true}
      />
      <div
        className="cf-turnstile inline-flex"
        data-sitekey={siteKey}
        data-theme="light"
      />
    </div>
  );
}
