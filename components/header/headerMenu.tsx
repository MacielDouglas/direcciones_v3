"use client";

import { UserRole } from "@/lib/navigation";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Menu, X } from "lucide-react";
import { Sidebar } from "../navigation/Sidebar";

export default function HeaderMenu({ role }: { role: UserRole }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="p-2">
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="fixed inset-0 p-0 m-0 rounded-none">
        <DrawerHeader>
          <div className="flex justify-between items-center p-4 border-b">
            <DrawerTitle className="text-lg font-medium">Menu</DrawerTitle>
            <button onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
        </DrawerHeader>

        <div
          className="h-[calc(100vh-64px)] overflow-y-auto"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("a")) setOpen(false);
          }}
        >
          <Sidebar role={role} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
