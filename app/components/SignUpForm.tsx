import { Turnstile } from "./Turnstile";
import messages from "../../messages.json";
import { env } from "../envClient.mjs";
import { Suspense } from "react";

interface SignUpFormProps {
  referral?: string;
}

export function SignUpForm({ referral }: SignUpFormProps) {
  return (
    <Suspense>
      <form className="flex flex-col" action="/submit-email" method="POST">
        <input hidden name="ref" value={referral} />
        <label htmlFor="email" className="mt-4 mb-1 text-sm px-2">
          {messages.signUpForm.email}
        </label>
        <input
          required
          className="h-10 border p-2 mb-4 rounded-lg text-sm"
          id="email"
          type="email"
          name="email"
          placeholder={messages.signUpForm.emailPlaceholder}
        />
        {env.TURNSTILE.ENABLED && (
          <div className="flex w-full justify-center mb-4">
            <Turnstile siteKey={env.TURNSTILE.SITE_KEY} />
          </div>
        )}
        <input
          className="p-2 bg-primary-500 rounded-lg cursor-pointer text-gray-50 transition-colors hover:bg-primary-600"
          type="submit"
          value={messages.signUpForm.submit}
        />
      </form>
    </Suspense>
  );
}
