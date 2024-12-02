"use client";

import { FilterJob } from "@/components/FilterJob";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RecruiterDashboard from "@/components/RecruiterDashboard";
import axios from "axios";

import { useEffect, useState } from "react";
import StudentDashboard from "@/components/StudentDashboard";
import { Job } from "@prisma/client";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await axios.get("/api/student/get-all-jobs");
        setJobs(res?.data?.data);
        console.log(res?.data?.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (status === "authenticated" && session?.user?.role === "STUDENT") {
      getAllJobs();
    }
  }, [status, session]);

  // Render loading while session is being fetched
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main className="w-full min-h-screen bg-[#08040b]">
      {session?.user?.role === "STUDENT" && <FilterJob />}
      <div className="container mx-auto">
        {session?.user?.role === "RECRUITER" && <RecruiterDashboard />}
        {session?.user?.role === "STUDENT" && <StudentDashboard jobs={jobs} />}
      </div>
    </main>
  );
}
