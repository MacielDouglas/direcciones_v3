import { z } from "zod";
import { LucideIcon } from "lucide-react";
import type { Route } from "next";

export const navItemSchema = z.object({
  name: z.string(),
  icon: z.custom<LucideIcon>(),
  href: z.custom<Route>(),
  permissions: z.readonly(
    z.array(z.enum(["member", "admin", "owner"])).nonempty()
  ),
  info: z.string(),
});

export type NavItem = z.infer<typeof navItemSchema>;
