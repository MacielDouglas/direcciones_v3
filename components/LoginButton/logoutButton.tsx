"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { LogoutIcon } from "../icons/icons";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login");
          console.log("desconectado");
        },
      },
    });
  };

  return (
    <Button onClick={signOut}>
      <LogoutIcon />
    </Button>
  );
}
