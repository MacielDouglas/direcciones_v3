import { UserRole } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import NavigationMenu from "./NavigationMenu";

type SidebarProps = {
  role: UserRole;
  className?: string;
};

export const Sidebar = ({ role, className }: SidebarProps) => {
  return (
    <div>
      <aside className={cn("flex h-full p-6 flex-col", className)}>
        <NavigationMenu role={role} />
      </aside>
    </div>
  );
};
