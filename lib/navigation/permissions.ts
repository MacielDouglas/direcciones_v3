import { NavItem } from "./schemas";

export type UserRole = "member" | "admin" | "owner";

export const filterNavigationByRole = (
  role: UserRole,
  items: readonly NavItem[]
): NavItem[] => {
  return items
    .filter((item) => item.permissions.includes(role))
    .map((item) => {
      if (item.type === "accordion") {
        const filteredItems = item.items.filter((sub) =>
          sub.permissions.includes(role)
        );

        if (filteredItems.length === 0) return null;

        return {
          ...item,
          items: filteredItems,
        };
      }

      return item;
    })
    .filter(Boolean) as NavItem[];
};
