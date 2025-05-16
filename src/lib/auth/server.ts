import "server-only";

import { betterAuth } from "better-auth";
import { nextCookies, toNextJsHandler } from "better-auth/next-js";
import { headers } from "next/headers";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import { accountTable, sessionTable, userTable, verificationTable } from "@/db/schema";

export const auth = betterAuth({
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userTable,
      session: sessionTable,
      account: accountTable,
      verification: verificationTable,
    }
  }),
});

export const handler = toNextJsHandler(auth.handler);

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (process.env.NODE_ENV === "development") {
    console.log("[AUTH] Session data:", JSON.stringify(session, null, 2));
  }

  return session;
};