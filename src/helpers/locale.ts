import messages from "@/locales/en.json";

export function localizeError(errorCode: string): string {
  const errorMessage =
    errorCode in messages.errors
      ? messages.errors[errorCode as keyof typeof messages.errors]
      : messages.errors.fallback;
  return errorMessage;
}
