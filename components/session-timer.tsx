"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface SessionTimerProps {
  expiresAt: string | Date;
}

export function SessionTimer({ expiresAt }: SessionTimerProps) {
  // Estado para controle de hydration - inicializa diretamente
  const [isClient, setIsClient] = useState(false);
  const [now, setNow] = useState(0);

  // Calcula o timestamp alvo uma vez no client
  const target = useMemo(() => {
    if (!isClient) return 0;
    return new Date(expiresAt).getTime();
  }, [expiresAt, isClient]);

  const timeLeft = target - now;

  // Marca quando o componente está no client usando setTimeout
  useEffect(() => {
    // Usando setTimeout para evitar chamada síncrona no efeito
    const timer = setTimeout(() => {
      setIsClient(true);
      setNow(Date.now());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Interval do relógio (só no client)
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isClient]);

  // Toast de 5 minutos restantes
  useEffect(() => {
    if (!isClient || timeLeft <= 0) return;

    if (timeLeft <= 1 * 60 * 1000 && timeLeft > 9999) {
      toast.warning("Sua sessão expira em menos de um minuto!", {
        duration: 10000,
      });
    }
  }, [timeLeft, isClient]);

  // Logout automático
  useEffect(() => {
    if (!isClient || timeLeft > 0) return;

    if (timeLeft <= 0) {
      authClient.signOut().then(() => {
        window.location.href = "/login";
      });
    }
  }, [timeLeft, isClient]);

  // Renderização segura durante SSR - mantém exatamente a mesma estrutura
  if (!isClient || timeLeft <= 0) {
    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="text-muted-foreground font-mono text-sm">
          {/* Container da barra de progresso mantido mesmo no SSR */}
          <div className="h-1 w-full bg-neutral-200 rounded">
            <div
              className="h-full rounded bg-neutral-200"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Converte pra mm:ss
  const minutes = Math.floor(timeLeft / 1000 / 60)
    .toString()
    .padStart(2, "0");

  const seconds = Math.floor((timeLeft / 1000) % 60)
    .toString()
    .padStart(2, "0");

  const isCritical = timeLeft <= 10 * 60 * 1000;
  const total = 60 * 60 * 1000;
  const progress = ((total - timeLeft) / total) * 100;

  return (
    <div className="flex flex-col gap-1 w-full">
      <div
        className={`font-mono font-semibold text-sm ${
          isCritical ? "text-red-500" : "text-muted-foreground"
        }`}
      >
        {minutes}:{seconds}
        {/* Barra progressiva */}
        <div className="h-1 w-full bg-neutral-200 rounded">
          <div
            className={`h-full rounded ${
              isCritical ? "bg-red-500" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Resto do código permanece igual...

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { toast } from "sonner";
// import { authClient } from "@/lib/auth-client";

// interface SessionTimerProps {
//   expiresAt: string | Date;
// }

// export function SessionTimer({ expiresAt }: SessionTimerProps) {
//   // Convert only once, on client
//   const target = useMemo(() => new Date(expiresAt).getTime(), [expiresAt]);

//   const [now, setNow] = useState(() => Date.now());
//   const timeLeft = target - now;

//   // Interval do relógio
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setNow(Date.now());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Toast de 5 minutos restantes
//   useEffect(() => {
//     if (timeLeft <= 5 * 60 * 1000 && timeLeft > 0) {
//       toast.warning("Sua sessão expira em menos de 5 minutos!", {
//         duration: 4000,
//       });
//     }
//   }, [timeLeft]);

//   // Logout automático
//   useEffect(() => {
//     if (timeLeft <= 0) {
//       authClient.signOut().then(() => {
//         window.location.href = "/login";
//       });
//     }
//   }, [timeLeft]);

//   // Evita mismatch: enquanto o client ainda não calculou
//   if (typeof window === "undefined") {
//     return <div className="text-muted-foreground font-mono text-sm">--:--</div>;
//   }

//   if (timeLeft <= 0) {
//     return (
//       <div className="text-red-500 font-mono font-semibold text-sm">00:00</div>
//     );
//   }

//   // Converte pra mm:ss
//   const minutes = Math.floor(timeLeft / 1000 / 60)
//     .toString()
//     .padStart(2, "0");

//   const seconds = Math.floor((timeLeft / 1000) % 60)
//     .toString()
//     .padStart(2, "0");

//   const isCritical = timeLeft <= 10 * 60 * 1000;
//   const total = 60 * 60 * 1000;
//   const progress = ((total - timeLeft) / total) * 100;

//   return (
//     <div className="flex flex-col gap-1 w-full">
//       <div
//         className={`font-mono font-semibold text-sm ${
//           isCritical ? "text-red-500" : "text-muted-foreground"
//         }`}
//       >
//         {minutes}:{seconds}
//         {/* Barra progressiva */}
//         <div className="h-1 w-full bg-neutral-200 rounded">
//           <div
//             className={`h-full rounded ${
//               isCritical ? "bg-red-500" : "bg-blue-500"
//             }`}
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }
