import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession();

  if (!session) return redirect("/login");
  if (!session.session.activeOrganizationId) return redirect("/");

  // const roles = (session as any).roles ?? [];

  //   if (!roles.includes("admin") && !roles.includes("owner")) {
  //     return redirect("/dashboard");
  //   }

  return <>{children}</>;
}
