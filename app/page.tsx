"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWalletBalance } from "@/hooks/use-wallet-balance";

export default function Home() {
  const { connected, publicKey } = useWallet();
  const { balance, status } = useWalletBalance(publicKey);

  return (
    <main className="h-full flex flex-col gap-4 justify-center items-center">
      <p>
        Wallet Connection Status: {connected === true ? "connected" : "idle"}
      </p>
      <p>
        Account Balance:
        {status === "pending" ? <span>Loading balance...</span> : null}
        {status === "error" ? (
          <span className="text-red-500">Error fetching balance</span>
        ) : null}
        {status === "success" && balance ? (
          <span>{(balance / LAMPORTS_PER_SOL).toFixed(5)}</span>
        ) : null}
        {status === "success" ? <span>{0}</span> : null}
      </p>
    </main>
  );
}
