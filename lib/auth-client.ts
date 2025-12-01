import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        group: {
          type: "string",
          required: false,
        },
      },
    }),
    organizationClient(),
    adminClient(),
  ],
});

export const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",

    callbackURL: "/",
  });

  return data;
};

export const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        console.log("desconectado");
      },
    },
  });
};
