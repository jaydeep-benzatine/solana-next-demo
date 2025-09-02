import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function balanceInSol(lamports: number, fractionDigits: number = 5) {
  if (lamports < 0) throw new Error("Lamports cannot be negative");

  return (lamports / LAMPORTS_PER_SOL).toFixed(fractionDigits);
}
