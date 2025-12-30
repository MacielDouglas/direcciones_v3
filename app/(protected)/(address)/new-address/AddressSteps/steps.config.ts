export const STEPS = [
  { id: 1, label: "Dirección" },
  { id: 2, label: "GPS" },
  { id: 3, label: "Imagen" },
  { id: 4, label: "Revisión" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];
