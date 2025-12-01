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

export default function Dashboard() {
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
    </div>
  );
}
