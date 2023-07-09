export async function verifyRequest(
  formData: FormData,
  headers: Headers,
  secretKey: string
): Promise<boolean> {
  const token = formData.get("cf-turnstile-response");
  const ip = headers.get("CF-Connecting-IP");
  if (!token || !ip) {
    return false;
  }
  const body = new FormData();
  body.append("secret", secretKey);
  if (token) {
    body.append("response", token);
  }
  if (ip) {
    body.append("remoteip", ip);
  }
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    }
  );
  const outcome = await response.json();
  return outcome.success;
}
