'use client';

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./navbar";
import { SolanaProvider } from "./provider/SolanaProvider";

interface MainLayoutProps {
  children: ReactNode;
}

const client = new QueryClient();

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col gap-2 bg-black text-white font-mono text-2xl">
      <QueryClientProvider client={client}>
        <SolanaProvider>
          <Navbar />
          {children}
        </SolanaProvider>
      </QueryClientProvider>
    </div>
  );
}
