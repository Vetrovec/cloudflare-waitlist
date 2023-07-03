import { Turnstile } from "./Turnstile";
import messages from "../../messages.json";
import { env } from "../env.mjs";
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
        {env.NEXT_PUBLIC_TURNSTILE_ENABLED && (
          <div className="flex w-full justify-center mb-4">
            <Turnstile siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} />
          </div>
        )}
        <input
          className="p-2 bg-blue-500 rounded-lg cursor-pointer text-white transition-colors hover:bg-blue-600"
          type="submit"
          value={messages.signUpForm.submit}
        />
      </form>
    </Suspense>
  );
}
