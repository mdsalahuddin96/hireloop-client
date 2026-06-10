// import ApplyCard from "@/components/Main/ApplyCard";
import SimilarJobs from "@/components/Main/SimilarJobs";
import { getJobsById } from "@/lib/api/companies";
import Image from "next/image";
import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobsById(id);
  return (
    <div className="relative container mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="col-span-2 rounded-2xl border border-white/10 bg-content1 p-6 md:p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold">{job.title}</h1>
          {/* Company */}
          <div className="mt-6 flex items-center gap-4">
            <Image
              src={job.companyLogo}
              alt={job.companyName}
              width={70}
              height={70}
              className="rounded-xl object-cover"
            />

            <div>
              <h2 className="text-xl font-semibold">{job.companyName}</h2>
            </div>
          </div>
          <div className="space-y-6 mt-10">
            {/* Responsibilities */}

            <div className="rounded-2xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">Responsibilities</h2>

              <p className="leading-7 text-default-600">
                {job.responsibilities}
              </p>
            </div>

            {/* Requirements */}

            <div className="rounded-2xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">Requirements</h2>

              <p className="leading-7 text-default-600">{job.requirements}</p>
            </div>

            {/* Benefits */}

            <div className="rounded-2xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">Benefits</h2>

              <p className="leading-7 text-default-600">{job.benefits}</p>
            </div>
          </div>
        </div>
        {/* Apply card */}
        <div className="sticky top-30 rounded-2xl h-100 border p-6">
          <h3 className="mb-6 text-xl font-semibold">Apply Now</h3>
          <div>
            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <FaMapMarkerAlt />
                Location
              </p>
              <p className="ml-5">
                {job.city}, {job.country}
              </p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <FaMoneyBillWave className="text-primary" />
                Salary
              </p>
              <p className="ml-5">
                {job.salaryMin} - {job.salaryMax} {job.currency.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <FaBriefcase className="text-primary" />
                Job Type
              </p>
              <p className="ml-5">
                {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <FaGlobe className="text-primary" />
                Work Mode
              </p>
              <p className="ml-5">{job.remote ? "Remote" : "Onsite"}</p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center gap-1">
                <FaCalendarAlt className="text-primary" />
                Deadline
              </p>
              <p className="ml-5">{job.deadline}</p>
            </div>
            <Link href={`/jobs/${job._id}/apply`}>
              <Button color="primary" className="w-full mt-8">
                Apply for this job
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <SimilarJobs />
    </div>
  );
};

export default JobDetailsPage;
