import ApplicationForm from "@/components/Main/ApplicationForm";
import { getApplications } from "@/lib/api/applications";
import { getJobsById } from "@/lib/api/companies";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
const ApplyPage = async ({ params }) => {
  const user = await getUserSession();
  const { id } = await params;
  const job=await getJobsById(id);
  const applications=await getApplications(user?.id)
  
  if (!user) {
    redirect(`/signin?callbackURL=/jobs/${id}/apply`);
  }
  if (user?.role !== "seeker") {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border p-8 text-center">
          <h2 className="text-2xl font-bold">Only Seekers Can Apply</h2>

          <p className="mt-3 text-default-500">
            You must be logged in as a seeker account to apply for jobs.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-content1 p-6 md:p-8">
        <div className="border" >Applied {applications.length} out of 3</div>
       

        <ApplicationForm job={job} user={user} />
      </div>
    </div>
  );
};

export default ApplyPage;
