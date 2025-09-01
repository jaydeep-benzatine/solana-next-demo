"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTransactionSignatures } from "@/lib/data-access";

export default function Transactions() {
  const { publicKey } = useWallet();

  const { data: transactions } = useQuery({
    queryKey: ["transactions", publicKey],
    queryFn: () => publicKey && getTransactionSignatures(publicKey),
  });

  return (
    <main className="h-full flex flex-col gap-5 justify-center items-center">
      <p>Transactions</p>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Block Time</TableHead>
              <TableHead className="text-white">Signature</TableHead>
              <TableHead className="text-white">Confirmation Status</TableHead>
              <TableHead className="text-white">Slot</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions ? (
              transactions.map((txn) => (
                <TableRow
                  key={txn.blockTime}
                  className="cursor-pointer"
                  onClick={(_) =>
                    window.open(
                      `https://explorer.solana.com/tx/${txn.signature}?cluster=devnet`,
                      "_blank",
                    )
                  }
                >
                  <TableCell>
                    {txn.blockTime
                      ? new Date(txn.blockTime * 1000).toISOString()
                      : txn.blockTime}
                  </TableCell>
                  <TableCell>{txn.signature}</TableCell>
                  <TableCell className="flex justify-center">
                    <Badge
                      variant="default"
                      className="bg-green-600 text-white font-bold"
                    >
                      {txn.confirmationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{txn.slot}</TableCell>
                </TableRow>
              ))
            ) : (
              <p>No Data Found</p>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
