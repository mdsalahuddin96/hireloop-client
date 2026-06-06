import PostJobForm from "@/components/PostJobForm";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

export default async function PostJobPage() {
  const company=await getLoggedInRecruiterCompany()
  
return(
  <PostJobForm company={company}/>
)
}
