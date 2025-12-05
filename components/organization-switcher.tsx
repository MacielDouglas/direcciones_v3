"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { Organization } from "better-auth/plugins";
import { toast } from "sonner";

interface OrganizationSwitcherProps {
  organizations: Organization[];
}

export function OrganizationSwitcher({
  organizations,
}: OrganizationSwitcherProps) {
  const { data: activeOrganization } = authClient.useActiveOrganization();

  const handleChangeOrganization = async (organizationId: string) => {
    try {
      const { error } = await authClient.organization.setActive({
        organizationId,
      });

      if (error) {
        toast.error("falha ao trocar...");
        return;
      }

      toast.success("Organização trocada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao trocar organização");
    }
  };

  return (
    <>
      {activeOrganization && (
        <div className="text-sm text-muted-foreground">
          {activeOrganization.name}
        </div>
      )}
      <Select
        onValueChange={handleChangeOrganization}
        value={activeOrganization?.id ?? ""}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
