import { z } from "zod";
import { LucideIcon } from "lucide-react";
import type { Route } from "next";

const baseNavItemSchema = {
  name: z.string(),
  icon: z.custom<LucideIcon>(),
  permissions: z.readonly(
    z.array(z.enum(["member", "admin", "owner"])).nonempty()
  ),
  info: z.string(),
};

const navLinkSchema = z.object({
  type: z.literal("link"),
  ...baseNavItemSchema,
  href: z.custom<Route>(),
});

const navAccordionSchema = z.object({
  type: z.literal("accordion"),
  ...baseNavItemSchema,
  items: z.readonly(
    z
      .array(
        z.object({
          name: z.string(),
          href: z.custom<Route>(),
          permissions: z.readonly(
            z.array(z.enum(["member", "admin", "owner"])).nonempty()
          ),
          icon: z.custom<LucideIcon>().optional(), // ✅ AQUI
        })
      )
      .nonempty()
  ),
});

export const navItemSchema = z.union([navLinkSchema, navAccordionSchema]);

export type NavItem = z.infer<typeof navItemSchema>;
