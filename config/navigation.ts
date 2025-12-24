import { navItemSchema } from "@/lib/navigation";
import {
  Shield,
  Dock,
  MapPinned,
  Users2,
  User2,
  MapPinCheck,
  MapPinPen,
  MapPinHouse,
} from "lucide-react";
import { Route } from "next";

export const navigation = [
  {
    type: "link",
    name: "Mis Tarjetas",
    icon: Dock,
    href: "/cards" as Route,
    permissions: ["member"],
    info: "Gestión de tarjetas.",
  },
  {
    type: "accordion",
    name: "Tarjetas",
    icon: Dock,
    permissions: ["member", "admin", "owner"],
    info: "Gestión de tarjetas.",
    items: [
      {
        name: "Mis Tarjetas",
        href: "/cards" as Route,
        permissions: ["admin", "owner"],
      },
      {
        name: "Enviar Tarjeta",
        href: "/send-card" as Route,
        permissions: ["admin", "owner"],
      },
    ],
  },
  {
    type: "accordion",
    name: "Direcciones",
    icon: MapPinned,
    permissions: ["member", "admin", "owner"],
    info: "Gestión de direcciones.",
    items: [
      {
        name: "Enviar Nueva Dirección",
        href: "/new-address" as Route,
        permissions: ["member", "admin", "owner"],
        icon: MapPinCheck,
      },
      {
        name: "Pesquisar Dirección",
        href: "/search-address" as Route,
        permissions: ["member", "admin", "owner"],
        icon: MapPinHouse,
      },
      {
        name: "Modificar Dirección",
        href: "/update-address" as Route,
        permissions: ["member", "admin", "owner"],
        icon: MapPinPen,
      },
    ],
  },
  {
    type: "link",
    name: "Mi Perfil",
    icon: User2,
    href: "/mi-perfil" as Route,
    permissions: ["member"],
    info: "Perfil del usuário.",
  },

  {
    type: "link",
    name: "Users",
    icon: Users2,
    href: "/usuarios" as Route,
    permissions: ["admin", "owner"],
    info: "Administración de los usuarios.",
  },
  {
    type: "accordion",
    name: "Admin",
    icon: Shield,
    permissions: ["owner"],
    info: "Administración del sistema.",
    items: [
      {
        name: "Admin Panel",
        href: "/dashboard" as Route,
        permissions: ["owner"],
      },
    ],
  },
] as const;

navItemSchema.array().parse(navigation);

// export const navigation = [
//   {
//     name: "Tarjetas",
//     icon: Dock,
//     href: "/cards" as Route,
//     permissions: ["member", "admin", "owner"],
//     info: "Acesse las tarjetas asignadas.",
//   },
//   {
//     name: "Direcciones",
//     icon: MapPinned,
//     href: "/address" as Route,
//     permissions: ["member", "admin", "owner"],
//     info: "Puede enviar una nueva dirreción o corfirmar si ya existe esta dirección.",
//   },
//   {
//     name: "Users",
//     icon: Users2,
//     href: "/usuarios" as Route,
//     permissions: ["admin", "owner"],
//     info: "Administración de los usuarios.",
//   },
//   {
//     name: "Enviar Tarjeta",
//     icon: SendHorizontal,
//     href: "/send-card" as Route,
//     permissions: ["admin", "owner"],
//     info: "Administración de las tarjetas.",
//   },
//   {
//     name: "Admin Panel",
//     icon: Shield,
//     href: "/dashboard" as Route,
//     permissions: ["owner"],
//     info: "Administración del grupo",
//   },
// ] as const;

// navItemSchema.array().parse(navigation);
