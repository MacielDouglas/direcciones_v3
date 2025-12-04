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

export async function getOrganizationBySlug(slug: string) {
  try {
    const organizationBySlug = await prisma.organization.findUnique({
      where: { slug: slug },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });
    return organizationBySlug;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// id: string;
// role: string;
// organizationId: string;
// user: {
//   id: string;
//   name: string | null;
//   email: string;
//   image: string;
// }

// export async function getOrganizationBySlug(slug: string) {
//   if (!slug || typeof slug !== "string") {
//     console.warn("getOrganizationBySlug: slug inválido");
//     return null;
//   }

//   try {
//     const organization = await prisma.organization.findUnique({
//       where: { slug },
//       select: {
//         id: true,
//         name: true,
//         slug: true,
//         createdAt: true,

//         // updatedAt: true,

//         members: {
//           select: {
//             id: true,
//             role: true,
//             userId: true,
//             organizationId: true,
//             user: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 image: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return organization ?? null;
//   } catch (error) {
//     console.error("Erro ao buscar organização pelo slug:", error);
//     return null;
//   }
// }
