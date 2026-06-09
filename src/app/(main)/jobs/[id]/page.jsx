import ApplyCard from "@/components/Main/ApplyCard";
import SimilarJobs from "@/components/Main/SimilarJobs";
import { getJobsById } from "@/lib/api/companies";
import Image from "next/image";
import React from "react";
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
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-content1 p-6 md:p-8">
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

              <p className="mt-1 flex items-center gap-2 text-default-500">
                <FaMapMarkerAlt size={14} />
                {job.city}, {job.country}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-primary" />
              <span>
                <strong>Salary:</strong> {job.salaryMin} - {job.salaryMax}{" "}
                {job.currency.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaBriefcase className="text-primary" />
              <span>
                <strong>Job Type:</strong> {job.jobType}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaGlobe className="text-primary" />
              <span>
                <strong>Work Mode:</strong> {job.remote ? "Remote" : "Onsite"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-primary" />
              <span>
                <strong>Deadline:</strong> {job.deadline}
              </span>
            </div>
          </div>

          {/* Divider */}
          {/* <div className="my-8 h-px bg-white/10" /> */}
          <div className="border border-gray-400 p-4 mt-4 rounded-2xl">
            {/* Responsibilities */}
            <section>
              <h3 className="mb-3 text-xl font-semibold">Responsibilities</h3>

              <p className="leading-8 text-default-600">
                {job.responsibilities}
              </p>
            </section>

            {/* Requirements */}
            <section className="mt-8">
              <h3 className="mb-3 text-xl font-semibold">Requirements</h3>

              <p className="leading-8 text-default-600">{job.requirements}</p>
            </section>

            {/* Benefits */}
            <section className="mt-8">
              <h3 className="mb-3 text-xl font-semibold">Benefits</h3>

              <p className="leading-8 text-default-600">{job.benefits}</p>
            </section>
          </div>
        </div>
        <div>
          <ApplyCard job={job} />
        </div>
      </div>

      <SimilarJobs/>
    </div>
  );
};

export default JobDetailsPage;
