import Header from "@/components/header/header";
import LogoutButton from "@/components/LoginButton/logoutButton";
import { Sidebar } from "@/components/navigation/Sidebar";

import { getCurrentUser } from "@/server/users";

export default async function Home() {
  const { user, memberRole } = await getCurrentUser();

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col justify-between items-center max-w-7xl mx-auto">
        <div className="text-center p-10">
          <h1 className="text-4xl tracking-wide font-light mb-6">
            Bienvenido, <span className="font-medium">{user.name}</span>
          </h1>

          {memberRole ? (
            <div>
              <p className="text-lg">Elija una opción para comenzar:</p>
              <Sidebar className={"border"} role={memberRole.role} />
              <LogoutButton />
              {/* <p>Não aparece</p> */}
            </div>
          ) : (
            <div>
              <p>
                Você ainda não faz parte de um grupo. Fale com um administrador.
              </p>
              {/* <SessionTimer expiresAt={session.expiresAt} /> */}
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
