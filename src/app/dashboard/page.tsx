"use client";

import { FilterJob } from "@/components/FilterJob";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RecruiterDashboard from "@/components/RecruiterDashboard";
import axios from "axios";
import { useEffect, useState } from "react";
import StudentDashboard from "@/components/StudentDashboard";
import ErrorPage from "next/error"; // Import error page for fallback handling

export interface Job {
  id: number;
  title: string;
  location: string;
  description?: string | null;
  salary: number;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null; // Update the type to string | null
}

interface JobsResponse {
  data: Job[];
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Fetch jobs for students
  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await axios.get<JobsResponse>("/api/student/get-all-jobs");
        setJobs(res?.data?.data);
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

  // Handle case when no session is found or invalid role
  if (!session || (session.user.role !== "STUDENT" && session.user.role !== "RECRUITER")) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <main className="w-full min-h-screen bg-[#08040b]">
      {session.user.role === "STUDENT" && <FilterJob />}
      <div className="container mx-auto">
        {session.user.role === "RECRUITER" && <RecruiterDashboard />}
        {session.user.role === "STUDENT" && jobs && <StudentDashboard jobs={jobs} />}
      </div>
    </main>
  );
}
