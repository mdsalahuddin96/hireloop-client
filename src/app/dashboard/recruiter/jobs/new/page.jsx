import PostJobForm from "@/components/PostJobForm";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaBuilding } from "react-icons/fa";

export default async function PostJobPage() {
  const company = await getLoggedInRecruiterCompany();
  if (!company) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border bg-content1 p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
            <FaBuilding className="text-2xl text-warning" />
          </div>

          <h2 className="text-2xl font-bold">Company Registration Required</h2>

          <p className="mt-3 text-default-500">
            You haven&apos;t registered a company yet. To post jobs and manage
            applicants, please register your company first.
          </p>

          <Link href="/dashboard/recruiter/company">
            <Button color="primary" size="lg" className="mt-6">
              Register Company
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return <PostJobForm company={company} />;
}
