"use client";

import { ArrowRight } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JobCard({ job }) {
  const router = useRouter();

  return (
    <Card className="w-full rounded-2xl border border-gray-500 shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <Card.Header className="flex items-start justify-between gap-3">
        <div>
          <Card.Title className="text-lg font-semibold">{job.title}</Card.Title>

          <Card.Description className="text-sm text-gray-400">
            {job.companyName} • {job.city}, {job.country}
          </Card.Description>
        </div>

        <Image
          src={job.companyLogo}
          alt={job.companyName}
          height={400}
          width={400}
          className="w-10 h-10 rounded-md object-cover border"
        />
      </Card.Header>

      {/* CONTENT */}
      <Card.Content className="space-y-3">
        {/* Category + Job Type */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 bg-gray-700 rounded-full">
            {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
            {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
          </span>
          {job.remote && (
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">
              Remote
            </span>
          )}
        </div>

        {/* Salary */}
        <p className="text-sm text-gray-400">
          💰 {job.salaryMin} - {job.salaryMax} {job.currency.toUpperCase()}
        </p>

        {/* Requirements */}
        <p className="text-sm text-gray-400 line-clamp-2">{job.requirements}</p>
      </Card.Content>

      {/* FOOTER */}
      <Card.Footer className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Deadline: {job.deadline}</p>

        <Link
          href={`/jobs/${job._id}`}
          className="flex gap-2 items-center  py-2 text-sm text-white hover:text-gray-900 hover:border hover:border-gray-900 cursor-pointer "
        >
          Apply Now <ArrowRight />
        </Link>
      </Card.Footer>
    </Card>
  );
}
