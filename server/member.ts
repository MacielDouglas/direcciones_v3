"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
// import { Role } from "better-auth/plugins";

export const addMember = async (
  organizationId: string,
  userId: string,
  role: "owner" | "admin" | "member"
) => {
  try {
    await auth.api.addMember({
      body: {
        userId,
        organizationId,
        role,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeMemberManually = async (
  organizationId: string,
  memberIdOrEmail: string
) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Não autenticado");

  // Verifica se é owner da organização
  const isOwner = await prisma.member.findFirst({
    where: {
      organizationId,
      userId: session.user.id,
      role: "owner",
    },
  });

  if (!isOwner) {
    throw new Error("Apenas o owner pode remover membros");
  }

  // Remove o membro (exceto o próprio owner)
  if (
    memberIdOrEmail === session.user.email ||
    session.user.id === memberIdOrEmail
  ) {
    throw new Error("Não é possível remover o próprio owner");
  }

  await prisma.member.deleteMany({
    where: {
      organizationId,
      OR: [{ userId: memberIdOrEmail }, { user: { email: memberIdOrEmail } }],
    },
  });

  return { success: true };
};
