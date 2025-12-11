import { navigation } from "@/config/navigation";
import { MenuItem } from "./MenuItem";
import { filterNavigationByRole, UserRole } from "@/lib/navigation";

export const Sidebar = ({ role }: { role: UserRole }) => {
  const items = filterNavigationByRole(role, navigation);

  return (
    <nav className="flex flex-col gap-2 p-4 border-r h-full">
      {items.map((item) => (
        <MenuItem key={item.href} item={item} />
      ))}
    </nav>
  );
};
