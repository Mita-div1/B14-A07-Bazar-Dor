/** Only allow in-site paths ("/product/x"), never "//evil.com" or full URLs. */
export function safeRedirect(value: string | null | undefined, fallback = "/"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
