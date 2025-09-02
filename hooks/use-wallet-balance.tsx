import type { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { getAccountBalance } from "@/lib/data-access";

export function useWalletBalance(publicKey: PublicKey | null) {
  const query = useQuery({
    queryKey: ["balance", publicKey],
    queryFn: () => publicKey && getAccountBalance(publicKey),
    enabled: !!publicKey,
  });

  return { ...query, balance: query.data ?? 0 };
}
