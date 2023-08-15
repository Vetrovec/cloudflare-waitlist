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

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setShowEmailInput(true);
  }, []);

  return (
    <form
      className="flex flex-col"
      action="/submit-email"
      method="POST"
      onSubmit={() => setIsSubmitted(true)}
    >
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
          disabled={isSubmitted}
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
      <button
        className="relative h-10 p-2 bg-primary-500 rounded-lg cursor-pointer text-gray-50 transition-colors enabled:hover:bg-primary-600 disabled:bg-primary-400 disabled:cursor-default"
        disabled={isSubmitted}
        type="submit"
      >
        {messages.signUpForm.submit}
        {isSubmitted && (
          <div
            role="status"
            className="absolute right-2 top-2 w-6 h-6 rounded-full animate-spin border-4 border-solid border-gray-50 border-t-transparent"
          />
        )}
      </button>
    </form>
  );
}
