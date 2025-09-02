"use client";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { connection } from "@/lib/data-access";

interface IAirdropForm {
  address: string;
  amount: string;
}

export default function Airdrop() {
  const form = useForm<IAirdropForm>({
    defaultValues: {
      address: "",
      amount: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: IAirdropForm) {
    try {
      const amount = Number(values.amount) * LAMPORTS_PER_SOL;
      const publicKey = new PublicKey(values.address);

      const response = await connection.requestAirdrop(publicKey, amount);

      console.log("Airdrop Response", response);

      toast.success("Airdrop Successful", { closeButton: true });
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
      <h3>Airdrop</h3>
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
                  <FormLabel>Amount</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Amount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0.5">0.5</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2.5">2.5</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
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
