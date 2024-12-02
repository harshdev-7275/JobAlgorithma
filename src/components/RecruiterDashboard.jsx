import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import CreateJob from "./CreateJob"
import ApplicantList from "./ApplicantList"

export default function RecruiterDashboard() {
    return (
        <div className="text-white pt-10">
      <Tabs defaultValue="applicants" className="w-full" >
        <TabsList>
          <TabsTrigger value="create">Create Job</TabsTrigger>
          <TabsTrigger value="applicants">View Applicants</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <CreateJob />
        </TabsContent>
        <TabsContent value="applicants">
          <ApplicantList />
        </TabsContent>
      </Tabs>
        </div>
    )
}