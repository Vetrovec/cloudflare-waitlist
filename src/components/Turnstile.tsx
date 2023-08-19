import Script from "next/script";
import appConfig from "@/app-config.json";

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
        data-theme={appConfig.captchaTheme}
      />
    </div>
  );
}
