import { getCurrentUser } from "@/server/users";
import NewAddress from "./NewAddress";

export default async function NewAddressPage() {
  const { session } = await getCurrentUser();
  const organizationId = session.activeOrganizationId;
  const userId = session.userId;

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-6 text-xl font-semibold">Novo endereço</h1>
      <NewAddress userId={userId} organizationId={organizationId!} />
    </main>
  );
}
