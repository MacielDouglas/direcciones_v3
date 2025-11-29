"use client";
// import { useSession } from "better-auth/react";
import { authClient, signIn } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    signIn();
  };

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
        },
      },
    });
  };

  const { data: session, isPending, error } = authClient.useSession();

  console.log(session?.user);

  return (
    <div>
      <Button onClick={handleSignIn}>Click aqui</Button>
      <Button onClick={handleSignout}>Sair</Button>
      {session ? (
        <div>
          <h1>Bem vindo {session.user.name}</h1>
          <p>Seu grupo é {session.user.group}</p>
        </div>
      ) : (
        <p>Usuário deslogado</p>
      )}
    </div>
  );
}
