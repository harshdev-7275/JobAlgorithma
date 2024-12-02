import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default  function ApplicantList() {
  // const applicants = await getApplicants()

  return (
    <div className="space-y-6">
      {/* {applicants.map((applicant) => (
        <Card key={applicant.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={applicant.avatar} alt={applicant.name} />
                <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{applicant.name}</CardTitle>
                <CardDescription>{applicant.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Applied for:</strong> {applicant.jobTitle}</p>
              <p><strong>Status:</strong> <Badge>{applicant.status}</Badge></p>
              <p><strong>Applied on:</strong> {new Date(applicant.appliedDate).toLocaleDateString()}</p>
              <p><strong>Experience:</strong> {applicant.experience} years</p>
              <p><strong>Skills:</strong> {applicant.skills.join(", ")}</p>
            </div>
          </CardContent>
        </Card>
      ))} */}
    </div>
  )
}

