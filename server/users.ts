"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const sessionUserId = session.user.id;

  const currentUser = await prisma.user.findUnique({
    where: { id: sessionUserId },
  });

  if (!currentUser) redirect("/login");

  return {
    ...session,
    currentUser,
  };
};

export const getUsers = async (organizationId: string) => {
  try {
    const members = await prisma.member.findMany({
      where: { organizationId },
      select: { userId: true },
    });

    const memberIds = members.map((m) => m.userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          notIn: memberIds.length > 0 ? memberIds : [""], // evita erro com array vazio
        },
      },
    });

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// export const signIn = async () => {
//   const data = await authClient.signIn.social({
//     provider: "google",

//     callbackURL: "/",
//   });

//   return data;
// };

// export const signIn = async () => {
//   const data = await authClient.signIn.social({
//     provider: "google",

//     callbackURL: "/",
//   });

//   return data;
// };

export const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        console.log("desconectado");
      },
    },
  });
};
