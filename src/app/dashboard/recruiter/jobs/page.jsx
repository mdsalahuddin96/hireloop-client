import RecruiterJobsTable from "@/components/dashboard/RecruiterJobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJobs } from "@/lib/api/getCompanyJobs";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";

const RecruiterJobsPage = async () => {
  const company = await getLoggedInRecruiterCompany();
  const jobs = await getCompanyJobs(company?._id);

  if (!jobs?.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border bg-content1 p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <FaBriefcase className="text-2xl text-primary" />
          </div>

          <h2 className="text-2xl font-bold">No Jobs Posted Yet</h2>

          <p className="mt-3 text-default-500">
            You haven&apos;t posted any jobs yet. Create your first job posting and
            start attracting qualified candidates.
          </p>

          <Link href="/dashboard/recruiter/jobs/new">
            <Button color="primary" size="lg" className="mt-6">
              Post a Job
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      Recruiter Jobs
      <RecruiterJobsTable jobs={jobs} />
    </div>
  );
};

export default RecruiterJobsPage;
