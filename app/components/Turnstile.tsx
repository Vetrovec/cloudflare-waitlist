import Script from "next/script";
import content from "../../content.json";

interface TurnstileProps {
  siteKey: string;
}

export default function Turnstile({ siteKey }: TurnstileProps) {
  return (
    <div className="turnstile-height">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        defer={true}
      />
      <div
        className="cf-turnstile inline-flex"
        data-sitekey={siteKey}
        data-theme={content.captchaTheme}
      />
    </div>
  );
}
