import { Turnstile } from "./Turnstile";
import messages from "../../messages.json";
import { env } from "../env.mjs";

interface SignUpFormProps {
  referralCode?: string;
  error?: string;
}

export function SignUpForm({ referralCode, error }: SignUpFormProps) {
  return (
    <div className="p-4 bg-white rounded-2xl">
      <form className="flex flex-col" action="/submit-email" method="POST">
        <div className="flex flex-col px-2 border-b">
          <h2 className="mb-1 font-semibold text-center text-2xl">
            {messages.signUpForm.title}
          </h2>
          <span className="mb-6 text-center text-xs text-slate-600">
            {messages.signUpForm.subtitle}
          </span>
        </div>
        <div className="px-2">
          <div className="flex flex-col" style={{ width: "300px" }}>
            <label htmlFor="email" className="mt-6 mb-1 text-sm px-2">
              {messages.signUpForm.email}
            </label>
            <input
              required
              className="h-10 border p-2 mb-4 rounded-lg text-sm"
              autoComplete="off"
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
              className="p-2 bg-blue-500 rounded-lg cursor-pointer text-white"
              type="submit"
              value={messages.signUpForm.submit}
            />
            {error && (
              <div className="mt-2 text-center text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
        <input hidden name="ref" value={referralCode} />
      </form>
    </div>
  );
}
