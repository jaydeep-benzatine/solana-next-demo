import Link from "next/link";
import WalletMultiButtonDynamic from "./wallet-multi-button-dynamic";

export default function Navbar() {
  return (
    <div className="h-16 bg-slate-900 flex items-center justify-between">
      <ul className="flex gap-4 mx-4">
        <li>
          <Link prefetch={true} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link prefetch={true} href="/transfer">
            Transfer
          </Link>
        </li>
        <li>
          <Link prefetch={true} href="/transactions">
            Transactions
          </Link>
        </li>
        <li>
          <Link prefetch={true} href="/airdrop">
            Airdrop
          </Link>
        </li>
      </ul>
      <div className="mx-4">
        <WalletMultiButtonDynamic />
      </div>
    </div>
  );
}
