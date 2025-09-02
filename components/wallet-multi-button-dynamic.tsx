"use client";

import dynamic from "next/dynamic";

const WalletMultiButtonDynamicComponent = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

export default function WalletMultiButtonDynamic() {
  return <WalletMultiButtonDynamicComponent />;
}
