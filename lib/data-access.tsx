import { Connection, clusterApiUrl, type PublicKey } from "@solana/web3.js";

export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export function getAccountBalance(publicKey: PublicKey) {
  return connection.getBalance(publicKey) ?? 0;
}

export function getTransactionSignatures(
  publicKey: PublicKey,
  limit = 10,
  before?: string,
) {
  return connection.getSignaturesForAddress(publicKey, { limit, before });
}
