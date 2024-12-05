import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CreateJob from "./CreateJob"
import ApplicantList from "./ApplicantList"
import { Button } from "./ui/button"
import { useState } from "react"

export default function RecruiterDashboard() {
  const[prompt, setPrompt] = useState("")
const testHandler = async () => {
  try {
      const response = await fetch("/api/test", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              prompt
          }),
      });

      if (!response.body) {
          throw new Error('No response body');
      }
      console.log("streaming",response.body)

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      console.log('Starting stream response...');

      while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
              console.log('Stream complete.');
              break;
          }

          const decodedChunk = decoder.decode(value, { stream: true });
          console.log('Chunk received:', decodedChunk);
      }
  } catch (error) {
      console.error("Error fetching AI response:", error);
  }
};

  return (
      <div className="text-white pt-10">
        <input type="text" onChange={(e)=> setPrompt(e.target.value)} />
        <Button onClick={testHandler}>TEST</Button>
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