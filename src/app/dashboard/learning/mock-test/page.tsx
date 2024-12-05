import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UploadResume from "@/components/UploadResume";

export default function MockTest() {
  return (
    <div className="bg-[#08040b] min-h-screen ">
      <div className="container mx-auto py-10 text-white">
        <h1 className="text-3xl font-bold mb-6">AI-Generated Mock Tests</h1>
        <Card className="mb-6 mt-5">
          <CardHeader>
            <CardTitle>Upload Job Description</CardTitle>
            <CardDescription>
              Paste the job description to generate a tailored mock test
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadResume/>
          </CardContent>
          <CardFooter>
            <Button>Generate Mock Test</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
