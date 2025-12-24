"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/navigation";
import { useMemo } from "react";

type SidebarAccordionProps = {
  item: Extract<NavItem, { type: "accordion" }>;
  onNavigate?: () => void;
};

export function SidebarAccordion({ item, onNavigate }: SidebarAccordionProps) {
  const pathname = usePathname();

  const isChildActive = useMemo(
    () => item.items.some((sub) => sub.href === pathname),
    [item.items, pathname]
  );

  const Icon = item.icon;

  return (
    <Accordion
      type="single"
      collapsible
      value={isChildActive ? item.name : undefined}
    >
      <AccordionItem value={item.name} className="border-none">
        <AccordionTrigger
          className={cn(sidebarItemBase, isChildActive && sidebarItemActive)}
        >
          <span className="flex items-center gap-3">
            <Icon className="h-6 w-6 shrink-0" />
            <span>{item.name}</span>
          </span>
        </AccordionTrigger>

        <AccordionContent className="pl-6 pt-2">
          <ul className="flex flex-col gap-1">
            {item.items.map((sub, index) => {
              const isActive = pathname === sub.href;
              const SubIcon = sub.icon;

              return (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      sidebarSubItemBase,
                      isActive && sidebarSubItemActive,
                      index !== item.items.length - 1 && "border-b"
                    )}
                  >
                    {SubIcon && <SubIcon className="h-5 w-5 shrink-0" />}
                    <span>{sub.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

/* =========================
 *  Styles (design tokens)
 * ========================= */

const sidebarItemBase =
  "flex h-12 w-full items-center justify-between gap-3 rounded-md px-3 text-base font-medium transition-colors hover:bg-accent";

const sidebarItemActive = "bg-accent text-accent-foreground";

const sidebarSubItemBase =
  "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors hover:bg-accent/60";

const sidebarSubItemActive = "bg-accent text-accent-foreground";
