import { NavItem } from "./schemas";

export type UserRole = "member" | "admin" | "owner";

export const filterNavigationByRole = (
  role: UserRole,
  items: readonly NavItem[]
): NavItem[] => {
  return items.filter((item) => item.permissions.includes(role));
};
