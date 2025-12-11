import type { NavItem } from "@/lib/navigation";
import Link from "next/link";

export function MenuItem({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className="
        group relative flex items-center gap-4 px-6 py-4
        rounded-3xl
    
         backdrop-blur-xl
        border border-white/20
        shadow-sm shadow-black/5
        transition-all duration-300
        hover:bg-white/20
        active:scale-95
      "
    >
      <item.icon className="h-7 w-7   relative z-10 drop-shadow-sm" />
      <span className=" text-lg font-medium relative z-10 drop-shadow-sm">
        {item.name}
      </span>
    </Link>
  );
}
