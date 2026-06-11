import ApplicationForm from "@/components/Main/ApplicationForm";
import { getApplications } from "@/lib/api/applications";
import { getJobsById } from "@/lib/api/companies";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
const ApplyPage = async ({ params }) => {
  const user = await getUserSession();
  const { id } = await params;
  const job = await getJobsById(id);
  const applications = await getApplications(user?.id);

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
  const plan={
    name:"free",
    maxApplication:3
  }
  if (applications.length >= plan.maxApplication) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border bg-content1 p-8 text-center my-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
          🚀
        </div>

        <h3 className="text-xl font-bold">Upgrade Required</h3>

        <p className="my-2 text-sm text-default-500">
          Your free plan application limit has been reached.
        </p>

        <Link
          href="/pricing"
          className="mt-10 px-2 py-1.5 rounded-full w-full bg-blue-400"
        >
          View Plans
        </Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-content1 p-6 md:p-8">
        <div className="border px-2 w-40 text-center py-1.5 rounded-full bg-white/5 backdrop-blur-2xl">
          <span>Applied {applications.length} out of 3</span>
        </div>
        <ApplicationForm job={job} user={user} />
      </div>
    </div>
  );
};

export default ApplyPage;
