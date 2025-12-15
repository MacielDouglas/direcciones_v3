import { navigation } from "@/config/navigation";
import { MenuItem } from "./MenuItem";
import { filterNavigationByRole, UserRole } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export const Sidebar = ({
  role,
  className,
}: {
  role: UserRole;
  className: string;
}) => {
  const items = filterNavigationByRole(role, navigation);

  return (
    <nav className="flex flex-col gap-2 p-4  h-full">
      {items.map((item) => (
        <MenuItem className={cn(className)} key={item.href} item={item} />
      ))}
    </nav>
  );
};
