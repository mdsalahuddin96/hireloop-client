import ApplicationForm from "@/components/Main/ApplicationForm";
import { getApplications } from "@/lib/api/applications";
import { getJobsById } from "@/lib/api/companies";
import { getUserSession } from "@/lib/core/session";
import { Check } from "@gravity-ui/icons";
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
      <div className="container mx-auto px-4 py-20 my-20">
        <div className="mx-auto max-w-xl rounded-2xl border p-8 text-center">
          <h2 className="text-2xl font-bold">Only Seekers Can Apply</h2>

          <p className="mt-3 text-default-500">
            You must be logged in as a seeker account to apply for jobs.
          </p>
        </div>
      </div>
    );
  }
  const plan = {
    name: "Free",
    maxApplication: 3,
  };
  if (applications.length >= plan.maxApplication) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="rounded-3xl border border-warning/20 bg-content1 p-8 text-center">
          <div className="mb-4 text-5xl">⚡</div>

          <h2 className="text-2xl font-bold">Application Limit Reached</h2>

          <p className="mt-3 text-default-500">
            You have used all {plan.maxApplication} applications included in your{" "}
            <span className="font-semibold">{plan.name}</span> plan.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link href="/pricing" color="primary">
              Upgrade Plan
            </Link>

            <Link href="/jobs" variant="bordered">
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-content1 p-6 md:p-8">
        <div className="border">Applied {applications.length} out of 3</div>

        <ApplicationForm job={job} user={user} />
      </div>
    </div>
  );
};

export default ApplyPage;
