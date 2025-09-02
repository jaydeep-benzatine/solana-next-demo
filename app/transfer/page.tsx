"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { connection, getAccountBalance } from "@/lib/data-access";

interface ITransferForm {
  address: string;
  amount: string;
}

export default function Transfer() {
  const { publicKey, sendTransaction } = useWallet();

  const { data } = useQuery({
    queryKey: ["balance", publicKey],
    queryFn: () => publicKey && getAccountBalance(publicKey),
  });

  const form = useForm<ITransferForm>({
    defaultValues: {
      address: "",
      amount: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: ITransferForm) {
    try {
      if (!publicKey || !data) return;

      const amount = Number(values.amount) * LAMPORTS_PER_SOL;
      const toPublicKey = new PublicKey(values.address);

      if (amount > data) {
        console.log(`${amount} > ${data} SOL`);
      }

      const txn = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toPublicKey,
          lamports: amount,
        }),
      );
      const signature = await sendTransaction(txn, connection);

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        signature,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        blockhash: latestBlockHash.blockhash,
      });

      toast.success("Transfer Successfully", { closeButton: true });
      form.reset();
    } catch (error) {
      if ((error as Error).message) {
        toast.error(JSON.stringify((error as Error).message));
        return;
      }

      toast.error(JSON.stringify(error));
    }
  }

  return (
    <main className="h-full flex flex-col gap-4 justify-center items-center">
      <h3>Transfer Money</h3>
      <div className="border p-12 rounded-2xl bg-slate-950 w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Wallet Address" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (In SOL)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
