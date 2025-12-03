"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getOrganizations() {
  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });
  return organizations;
}

export async function getActiveOrganization(userId: string) {
  const memberUser = await prisma.member.findFirst({
    where: { userId: userId },
  });

  if (!memberUser) return null;

  const activeOrganization = await prisma.organization.findFirst({
    where: { id: memberUser.organizationId },
  });

  return activeOrganization;
}
