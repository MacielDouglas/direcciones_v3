"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { removeMemberManually } from "@/server/member";
import { toast } from "sonner";

export default function MembersTableAction({
  organizationId,
  memberIdOrEmail,
}: {
  organizationId: string;
  memberIdOrEmail: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRemoveMember = async () => {
    try {
      setIsLoading(true);
      await removeMemberManually(organizationId, memberIdOrEmail);
      toast.success("Membro removido com sucesso!");
      router.refresh(); // ou router.invalidate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao remover");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="destructive"
      size="sm"
      type="button"
      disabled={isLoading}
      onClick={() => handleRemoveMember()}
    >
      Remover
    </Button>
  );
}
