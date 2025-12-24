"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRole } from "@/lib/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NavigationMenu from "./NavigationMenu";

export const MobileMenuDrawer = ({ role }: { role: UserRole }) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full max-w-none p-4 text-center">
        <SheetTitle className="text-lg font-medium">Menu</SheetTitle>
        <NavigationMenu role={role} onNavigate={() => setOpen(false)} />
        <p>Sair</p>
      </SheetContent>
    </Sheet>
  );
};
