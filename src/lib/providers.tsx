"use client";
import Navbar from "@/components/Navbar";
  import { SessionProvider, useSession } from "next-auth/react";

  export function Providers({ children }: { children: React.ReactNode }) {
  
    return <SessionProvider> {children}</SessionProvider>;
  }