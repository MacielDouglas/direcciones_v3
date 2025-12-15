"use client";

import { UserRole } from "@/lib/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  // SheetClose, // Importante para acessibilidade
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/navigation/Sidebar"; // Ajustei o import para path absoluto (boa prática)

interface HeaderMenuProps {
  role: UserRole;
}

export default function HeaderMenu({ role }: HeaderMenuProps) {
  const [open, setOpen] = useState(false);

  // Handler para fechar ao clicar em links (comportamento de SPA)
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Verifica se o clique foi num link ou dentro de um link
    if (target.closest("a")) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Abrir menu" // Acessibilidade
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      {/* 
        side="right" -> Define a animação da direita para esquerda.
        w-[70%] -> Ocupa 70% da largura (padrão do Tailwind).
        sm:w-[70%] -> Garante responsividade.
        O overlay (fundo preto 30%) já é padrão do Sheet do Shadcn, 
        mas pode ser ajustado no arquivo CSS global se precisar mudar a opacidade específica.
      */}
      <SheetContent
        side="right"
        className="w-[80%] sm:max-w-[80%] p-0 h-full border-l bg-background"
      >
        <SheetHeader className="px-4 py-4 border-b flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-lg font-medium">Menu</SheetTitle>

          {/* <SheetClose asChild>
            <button
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
              aria-label="Fechar menu"
            > */}
          {/* <X className="h-5 w-5" /> */}
          {/* </button>
          </SheetClose> */}
        </SheetHeader>

        <div
          className="h-full overflow-y-auto pb-safe" // pb-safe para respeitar a área segura do iPhone
          onClick={handleContentClick}
        >
          {/* Adicionei um padding container para o conteúdo não colar na borda */}
          <div className="p-4">
            <Sidebar
              className="gap-4 border-b hover:text-blue-300"
              role={role}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
