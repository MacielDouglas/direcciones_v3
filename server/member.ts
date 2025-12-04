"use server";

import { auth } from "@/lib/auth";
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
