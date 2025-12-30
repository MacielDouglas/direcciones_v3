"use server";

import prisma from "@/lib/prisma";
import { addressSchema } from "./address.schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
// import { authClient } from "@/lib/auth-client";

export async function createAddress(input: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });

  console.log("SESSION: __", session);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const data = addressSchema.parse(input);
  if (!data) {
    throw new Error("Invalid data");
  }

  console.log("DATA enviado.", data);
  console.log("Organization ID: ", session.session.activeOrganizationId);

  const address = await prisma.address.create({
    data: {
      ...data,
      createdUserId: session.user.id,
      organizationId: session.session.activeOrganizationId!,
    },
  });

  return address;
}
