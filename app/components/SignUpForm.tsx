"use client";

import { useEffect, useState } from "react";
import Turnstile from "./Turnstile";
import { env } from "../envClient.mjs";
import messages from "../../messages.json";

interface SignUpFormProps {
  referral?: string;
}

export default function SignUpForm({ referral }: SignUpFormProps) {
  // This should prevent password managers to modify the DOM and break hydration
  // Email field is hidden on first render and shown after effect runs
  // https://github.com/vercel/next.js/issues/51816
  const [showEmailInput, setShowEmailInput] = useState(false);

  useEffect(() => {
    setShowEmailInput(true);
  }, []);

  return (
    <form className="flex flex-col" action="/submit-email" method="POST">
      <input hidden name="ref" value={referral} />
      <label htmlFor="email" className="mt-4 mb-1 text-sm px-2">
        {messages.signUpForm.email}
      </label>
      {showEmailInput ? (
        <input
          required
          className="h-10 border p-2 mb-4 rounded-lg text-base text-gray-950 placeholder-gray-400"
          id="email"
          type="email"
          name="email"
          placeholder={messages.signUpForm.emailPlaceholder}
        />
      ) : (
        <div className="h-10 border p-2 mb-4 rounded-lg text-sm text-gray-400">
          {messages.signUpForm.emailPlaceholder}
        </div>
      )}
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
  );
}
