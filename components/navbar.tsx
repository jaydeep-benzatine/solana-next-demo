import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useWalletBalance } from "@/hooks/use-wallet-balance";
import { balanceInSol, cn } from "@/lib/utils";
import WalletMultiButtonDynamic from "./wallet-multi-button-dynamic";
import { useActiveLink } from "@/hooks/use-active-link";

export default function Navbar() {
  const { publicKey } = useWallet();
  const { balance } = useWalletBalance(publicKey);
  const pathname = useActiveLink();

  return (
    <div className="h-16 bg-slate-900 flex items-center justify-between font-[Orbitron]">
      <ul className="flex gap-4 mx-4">
        <li>
          <Link
            prefetch={true}
            href="/"
            className={cn(pathname === "/" && "font-semibold")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            prefetch={true}
            href="/transfer"
            className={cn(pathname === "/transfer" && "font-semibold")}
          >
            Transfer
          </Link>
        </li>
        <li>
          <Link
            prefetch={true}
            href="/transactions"
            className={cn(pathname === "/transactions" && "font-semibold")}
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link
            prefetch={true}
            href="/airdrop"
            className={cn(pathname === "/airdrop" && "font-semibold")}
          >
            Airdrop
          </Link>
        </li>
      </ul>
      <div className="mx-4">
        <div className="flex items-center gap-2">
          <p>
            Balance: <span>{balanceInSol(balance, 2)}</span>
          </p>
          <WalletMultiButtonDynamic />
        </div>
      </div>
    </div>
  );
}
