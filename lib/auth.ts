import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { Pool } from "pg";

const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const githubEnabled = Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);

/**
 * Local development  -> a ./sqlite.db file (no setup needed).
 * Production (Vercel) -> set DATABASE_URL to a Postgres connection string,
 *                        because Vercel's file system is read-only.
 */
const database = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Database("sqlite.db");

export const auth = betterAuth({
  database,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // After sign up the user is sent to the sign in page (see assignment).
    autoSignIn: false,
  },
  socialProviders: {
    ...(googleEnabled
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          },
        }
      : {}),
    ...(githubEnabled
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          },
        }
      : {}),
  },
});
