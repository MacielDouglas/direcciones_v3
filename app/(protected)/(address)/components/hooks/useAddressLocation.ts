"use client";

import { useState } from "react";

export function useAddressLocation() {
  const [editing, setEditing] = useState(false); // dialog aberto
  const [locked, setLocked] = useState(false); // parou tracking

  return {
    editing,
    locked,
    openDialog: () => {
      setEditing(true);
      setLocked(true);
    },
    closeDialog: () => setEditing(false),
    unlockTracking: () => setLocked(false),
  };
}
