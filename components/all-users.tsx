"use client";
// import { User } from "better-auth";
import { User } from "@/app/generated/prisma/client";
import { Button } from "./ui/button";
import { addMember } from "@/server/member";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface AllUsersProps {
  users: User[];
  organizationId: string;
}

export default function AllUsers({ users, organizationId }: AllUsersProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddMember = async (userId: string) => {
    try {
      setIsLoading(true);
      await addMember(organizationId, userId, "member");
      toast.success("Membro adicionado com sucesso!!!");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao adicionar novo membro.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Todos Usuários</h2>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex gap-5 items-center justify-between"
          >
            <Avatar>
              <AvatarImage
                src={user.image ?? undefined}
                className="rounded-full w-8"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{user.name}</p>
            <p className="truncate">{user.email}</p>
            <Button
              disabled={isLoading}
              onClick={() => handleAddMember(user.id)}
            >
              {isLoading ? (
                <Loader2 className="size-4  animate-spin" />
              ) : (
                "Adicionar"
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
