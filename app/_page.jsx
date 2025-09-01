{/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="flex flex-col font-mono">
          <p className="text-2xl font-bold mb-5">Account Details</p>
          <p>
            <span className="font-semibold">Public Key:</span>
            {publicKey?.toBase58()}
          </p>
          <p>
            <span className="font-semibold">Balance:</span>
            {(balance / LAMPORTS_PER_SOL).toFixed(3)}
          </p>
        </div>

        <SendSolDialog sendFn={sendSol} />
      </main> */}

      "use client";
      
      import { useWallet } from "@solana/wallet-adapter-react";
      import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
      import { useForm } from "react-hook-form";
      import z from "zod";
      
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
        Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
      } from "@/components/ui/dialog";
      import { useEffect, useState } from "react";
      import { connection, getAccountBalance } from "@/lib/data-access";
      import {
        LAMPORTS_PER_SOL,
        type PublicKey,
        SystemProgram,
        Transaction,
      } from "@solana/web3.js";
      import { toast } from "sonner";
      
      // 8pDtoyKXs72DGeNzz6BXoAGNT6v8erCiYwYiinbncU6D
      
      const formSchema = z.object({
        address: z.string(),
        amount: z.number().positive(),
      });
      
      export default function Home() {
        const { publicKey, sendTransaction } = useWallet();
      
        const [balance, setBalance] = useState(0);
      
        useEffect(() => {
          if (!publicKey) return;
      
          const timer = setInterval(() => {
            getAccountBalance(publicKey).then((_balance) => setBalance(_balance));
            console.log("refreshing balance");
          }, 10_000);
      
          () => {
            clearInterval(timer);
          };
        }, [publicKey]);
      
        async function sendSol(address: PublicKey, amount: number) {
          if (!publicKey) {
            toast.error("Wallet is not connected");
            return;
          }
      
          console.log("address", address);
          console.log("amount", amount);
      
          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: address,
              lamports: amount * LAMPORTS_PER_SOL,
            }),
          );
      
          const signature = await sendTransaction(transaction, connection);
          console.log("Txn Sig:", signature);
      
          await connection.confirmTransaction(signature);
          toast.success("Sol Sent Successfully!");
        }
      
        return (
          <main className="h-full flex justify-center items-center">Change</main>
        );
      }
      
      export function SendSolDialog({ sendFn }: { sendFn: CallableFunction }) {
        const form = useForm<z.infer<typeof formSchema>>({
          defaultValues: {
            address: "",
            amount: 0,
          },
          // resolver: zodResolver(formSchema),
        });
      
        const onSubmit = (values: z.infer<typeof formSchema>) => {
          sendFn(values.address, Number(values.amount));
        };
      
        return (
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button>Send Sol</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Send Sol to Another Wallet</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wallet Address</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder="Enter recipient address"
                              {...field}
                            />
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
                          <FormControl>
                            <Input
                              type="number"
                              autoComplete="off"
                              placeholder="No. of sol to transfer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="float-end" type="submit">
                      Submit
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </form>
          </Dialog>
        );
      }
      