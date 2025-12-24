import Link from "next/link";
import ButtonDarkMode from "../buttonTheme/ButtonDarkMode";
import { getCurrentUser } from "@/server/users";
import { SessionTimer } from "../session-timer";
import { MobileMenuDrawer } from "../navigation/MobileMenuDrawer";

export default async function Header() {
  const { session, memberRole } = await getCurrentUser();

  return (
    <header>
      <div className="mx-auto flex justify-between h-16 max-w-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="block uppercase text-2xl tracking-widest font-bold"
        >
          Direcciones
        </Link>
        <div className="flex gap-8 items-center">
          <ButtonDarkMode />
          <SessionTimer expiresAt={session.expiresAt} />
          {memberRole && <MobileMenuDrawer role={memberRole.role} />}
          {/* {memberRole && <HeaderMenu role={memberRole.role} />} */}
        </div>
      </div>
    </header>
  );
}
