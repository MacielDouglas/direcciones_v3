"use client";

import { navigation } from "@/config/navigation";
import { filterNavigationByRole, UserRole } from "@/lib/navigation";
import { SidebarAccordion } from "./SidebarAccordion";
import { SidebarLink } from "./SidebarLink";

type NavigationMenuProps = {
  role: UserRole;
  onNavigate?: () => void;
};
export default function NavigationMenu({
  role,
  onNavigate,
}: NavigationMenuProps) {
  const items = filterNavigationByRole(role, navigation);

  return (
    <nav className="flex flex-col gap-5 w-full">
      {items.map((item) =>
        item.type === "accordion" ? (
          <SidebarAccordion
            key={item.name}
            item={item}
            onNavigate={onNavigate}
          />
        ) : (
          <SidebarLink key={item.name} item={item} onNavigate={onNavigate} />
        )
      )}
    </nav>
  );
}
