import { navItemSchema } from "@/lib/navigation";
import { Shield, Dock, MapPinned, Users2, SendHorizontal } from "lucide-react";
import { Route } from "next";

export const navigation = [
  {
    name: "Tarjetas",
    icon: Dock,
    href: "/cards" as Route,
    permissions: ["member", "admin", "owner"],
    info: "Acesse las tarjetas asignadas.",
  },
  {
    name: "Direcciones",
    icon: MapPinned,
    href: "/address" as Route,
    permissions: ["member", "admin", "owner"],
    info: "Puede enviar una nueva dirreción o corfirmar si ya existe esta dirección.",
  },
  {
    name: "Users",
    icon: Users2,
    href: "/usuarios" as Route,
    permissions: ["admin", "owner"],
    info: "Administración de los usuarios.",
  },
  {
    name: "Enviar Tarjeta",
    icon: SendHorizontal,
    href: "/send-card" as Route,
    permissions: ["admin", "owner"],
    info: "Administración de las tarjetas.",
  },
  {
    name: "Admin Panel",
    icon: Shield,
    href: "/dashboard" as Route,
    permissions: ["owner"],
    info: "Administración del grupo",
  },
] as const;

navItemSchema.array().parse(navigation);
