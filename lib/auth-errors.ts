interface AuthErrorLike {
  code?: string;
  message?: string;
  status?: number;
}

/** Turns BetterAuth's English errors into friendly Bangla messages for the toast. */
export function bnAuthError(error: AuthErrorLike | null | undefined, fallback: string): string {
  if (!error) return fallback;
  switch (error.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
    case "INVALID_EMAIL":
      return "সঠিক ইমেইল ঠিকানা দিন";
    case "INVALID_PASSWORD":
      return "পাসওয়ার্ড সঠিক নয়";
    case "USER_NOT_FOUND":
      return "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি";
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে";
    case "PASSWORD_TOO_SHORT":
      return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    case "PASSWORD_TOO_LONG":
      return "পাসওয়ার্ড অনেক বড় হয়ে গেছে";
    case "PROVIDER_NOT_FOUND":
      return "এই সোশ্যাল লগইনটি এখনো চালু করা হয়নি";
    default:
      return fallback;
  }
}
