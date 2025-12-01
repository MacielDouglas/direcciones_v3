import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { admin, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      group: {
        type: "string",
        required: false,
        defaultValue: "0",
        input: true,
      },
    },
  },
  plugins: [admin(), organization(), nextCookies()],
});

// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import prisma from "./prisma";

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql", // or "mysql", "postgresql", ...etc
//   }),
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },
//   },
// });
