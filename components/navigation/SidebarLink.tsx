"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/navigation";
import { useMemo } from "react";

type SidebarLinkProps = {
  item: Extract<NavItem, { type: "link" }>;
  onNavigate?: () => void;
};

export function SidebarLink({ item, onNavigate }: SidebarLinkProps) {
  const pathname = usePathname();

  const isActive = useMemo(() => pathname === item.href, [pathname, item.href]);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(sidebarItemBase, isActive && sidebarItemActive)}
    >
      <Icon className="h-6 w-6 shrink-0" />
      <span>{item.name}</span>
    </Link>
  );
}

/* =========================
 *  Styles (design tokens)
 * ========================= */

const sidebarItemBase =
  "flex h-12 items-center gap-3 rounded-md px-3 text-base font-medium transition-colors hover:bg-accent";

const sidebarItemActive = "bg-accent text-accent-foreground";
