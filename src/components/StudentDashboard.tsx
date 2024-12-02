import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "./ui/button";
import DOMPurify from "dompurify";
import { formatMoney } from "@/lib/utils";
import { MapPin } from "lucide-react";

type Job = {
  id: string;
  title: string;
  location: string;
  description: string;
  salary: number;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

interface StudentDashboardProps {
  jobs: Job[];
}

const StudentDashboard = ({ jobs }: StudentDashboardProps) => {
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);

  const applyToJob = (jobId: string) => {
    if (appliedJobId !== jobId) {
      setAppliedJobId(jobId);
      console.log(`Applied to job with ID: ${jobId}`);
    }
  };

  return (
    <div>
      <BentoGrid className="max-w-4xl mx-auto">
        {jobs?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.companyName}
            description={`${formatMoney(item.salary)} per month`}
            header={<Skeleton desc={item.title} location={item.location}  />}
            button={
              <Button
                variant={appliedJobId === item.id ? "destructive" : "default"}
                onClick={() => applyToJob(item.id)}
                className="px-4 py-2 rounded-md font-medium"
              >
                {appliedJobId === item.id ? "Applied" : "Apply"}
              </Button>
            }
            className="font-semibold"
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default StudentDashboard;

const Skeleton = ({ desc, location }: { desc: string, location: string }) => {

  return (
    <div className="flex flex-1 w-full h-fit min-h-[6rem] p-2 rounded-xl bg-gradient-to-br text-white from-blue-900 to-blue-600 overflow-hidden">
      <div className="flex flex-col">
        <h1>{desc}</h1>
        <p className="flex items-center gap-2 font-light"><MapPin size={16}/>{location}</p>
      </div>
    </div>
  );
};

// const Skeleton = ({ desc }: { desc: string }) => {
//   const sanitizedDescription = DOMPurify.sanitize(desc);

//   return (
//     <div className="flex flex-1 w-full h-fit min-h-[6rem] p-2 rounded-xl bg-gradient-to-br from-gray-400 to-neutral-800 overflow-hidden">
//       <div
//         className="text-white font-thin overflow-hidden text-ellipsis break-words"
//         dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
//       />
//     </div>
//   );
// };

