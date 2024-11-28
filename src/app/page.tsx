"use client";
import { FilterJob } from "@/components/FilterJob";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router  = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  // if (status === "unauthenticated") {
  //   // This shouldn't happen because middleware already protects this page
  //   return (<p>Redirecting to login...</p>
  //   router.
      
  //   );
  // }
  
  return (
    <main className="w-full min-h-screen">
      <FilterJob />
      <div className="container mx-auto">
      </div>
    </main>
  );
}
