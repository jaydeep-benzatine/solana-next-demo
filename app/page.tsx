"use client";

import { getAccountBalance } from "@/lib/data-access";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { connected, publicKey } = useWallet();

  const { data } = useQuery({
    queryKey: ["balance", publicKey],
    queryFn: () => publicKey && getAccountBalance(publicKey),
  });

  return (
    <main className="h-full flex flex-col gap-4 justify-center items-center">
      <p>
        Wallet Connection Status: {connected === true ? "connected" : "idle"}
      </p>
      <p>Account Balance: {data ? data / LAMPORTS_PER_SOL : 0}</p>
    </main>
  );
}
