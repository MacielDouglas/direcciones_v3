import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/server/users";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getCurrentUser();
  // const session = await auth.api.getSession({ headers: await headers() });

  const user = await auth.api.getActiveMember({ headers: await headers() });
  // if (!user) return console.log("Não tem!!!");
  // const user = await auth.api.getActiveMember({ headers: await headers() });
  // const role = await auth.api.getActiveMemberRole({ headers: await headers() });

  // const org = await auth.api.getFullOrganization({ headers: await headers() });

  // console.log("ORG: ", org);

  console.log("Get Active", user);

  // console.log("Role :", role);

  // ❌ Não está logado → login
  // if (!session) return redirect("/login");

  // ❌ Está logado mas NÃO tem organização → home
  // if (!session.session.activeOrganizationId) return redirect("/");
  // console.log("Usando");

  return <>{children}</>;
}
