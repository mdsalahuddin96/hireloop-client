"use client";

import { Card } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function JobCard({ job }) {
  const router = useRouter();

  return (
    <Card className="w-full rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
      
      {/* HEADER */}
      <Card.Header className="flex items-start justify-between gap-3">
        <div>
          <Card.Title className="text-lg font-semibold text-gray-900">
            {job.title}
          </Card.Title>

          <Card.Description className="text-sm text-gray-500">
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
          <span className="px-2 py-1 bg-gray-100 rounded-full">
            {job.category}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
            {job.jobType}
          </span>
          {job.remote && (
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">
              Remote
            </span>
          )}
        </div>

        {/* Salary */}
        <p className="text-sm text-gray-700">
          💰 {job.salaryMin} - {job.salaryMax} {job.currency.toUpperCase()}
        </p>

        {/* Requirements */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {job.requirements}
        </p>
      </Card.Content>

      {/* FOOTER */}
      <Card.Footer className="flex items-center justify-between">
        
        <p className="text-xs text-gray-400">
          Deadline: {job.deadline}
        </p>

        <button
          onClick={() => router.push(`/jobs/${job._id || job.id}`)}
          className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          View Details
        </button>
      </Card.Footer>
    </Card>
  );
}