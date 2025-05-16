import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient();

export const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/feed",
  });

  return data;
};

export const signOut = async () => {
  const data = await authClient.signOut();
  return data;
};