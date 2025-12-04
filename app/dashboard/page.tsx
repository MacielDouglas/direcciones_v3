import { CreateOrganizationForm } from "@/components/forms/create_organization_form";
import LogoutButton from "@/components/LoginButton/logoutButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOrganizations } from "@/server/organizations";
import Link from "next/link";

export default async function Dashboard() {
  const organizations = await getOrganizations();

  console.log(organizations);

  // console.log(organizations);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LogoutButton />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Criar organização.</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Organização</DialogTitle>
            <DialogDescription>Criar uma nova organização.</DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm />
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Organizações</h2>
        {organizations.map((org) => (
          <Button type="button" variant="outline" key={org.id} asChild>
            <Link href={`/dashboard/organization/${org.slug}`}>{org.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
