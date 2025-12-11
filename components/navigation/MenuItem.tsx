import type { NavItem } from "@/lib/navigation";

export const MenuItem = ({ item }: { item: NavItem }) => (
  <a href={item.href} className="flex items-center gap-2 text-sm p-2">
    <item.icon className="h-4 w-4" />
    <span>{item.name}</span>
  </a>
);
