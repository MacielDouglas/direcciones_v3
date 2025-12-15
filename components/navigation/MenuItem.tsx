import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MenuItem({
  item,
  className,
}: {
  item: NavItem;
  className: string;
}) {
  return (
    <Link
      href={item.href}
      aria-label={item.info}
      className={cn("flex items-center gap-4 py-4  px-6", className)}
    >
      <item.icon className="h-7 w-7 " />
      <span className=" text-lg font-medium">{item.name}</span>
    </Link>
  );
}
