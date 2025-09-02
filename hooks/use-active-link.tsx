"use client";

import { usePathname } from "next/navigation";

export function useActiveLink() {
  return usePathname();
}
