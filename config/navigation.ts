import { navItemSchema } from "@/lib/navigation";
import { Home, User, Settings, Shield, LogOut } from "lucide-react";
import { Route } from "next";

export const navigation = [
  {
    name: "Home",
    icon: Home,
    href: "/" as Route,
    permissions: ["member", "admin", "owner"],
  },
  {
    name: "Profile",
    icon: User,
    href: "/profile" as Route,
    permissions: ["member", "admin", "owner"],
  },
  {
    name: "Admin Panel",
    icon: Shield,
    href: "/admin" as Route,
    permissions: ["admin", "owner"],
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings" as Route,
    permissions: ["admin", "owner"],
  },
  {
    name: "Exit",
    icon: LogOut,
    href: "/logout" as Route,
    permissions: ["member", "admin", "owner"],
  },
] as const;

navItemSchema.array().parse(navigation);
