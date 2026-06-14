"use client";

import { Eye } from "@gravity-ui/icons";
import { Table, Button } from "@heroui/react";
import { FaEdit, FaTrash } from "react-icons/fa";


export default function RecruiterJobsTable({ jobs }) {
  const getStatusBadge = (status) => {
    if (status === "active") {
      return (
        <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
          Active
        </span>
      );
    }

    if (status === "closed") {
      return (
        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
          Closed
        </span>
      );
    }

    return (
      <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-black">
        Draft
      </span>
    );
  };

  return (
    <div className="rounded-2xl border p-4">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Recruiter Jobs"
            // className="min-w-[950px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>Job Title</Table.Column>

              <Table.Column>Status</Table.Column>

              <Table.Column>Applicants</Table.Column>

              <Table.Column>Deadline</Table.Column>

              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs.map((job) => (
                <Table.Row key={job._id}>
                  <Table.Cell>{job?.title}</Table.Cell>

                  <Table.Cell>{getStatusBadge(job?.status)}</Table.Cell>

                  <Table.Cell>{job?.applicants || 0}</Table.Cell>

                  <Table.Cell>{job.deadline}</Table.Cell>

                  <Table.Cell>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="flat">
                        <FaEdit />
                      </Button>

                      <Button size="sm" variant="flat">
                        <Eye />
                      </Button>
                      <Button size="sm" variant="flat" >
                        <FaTrash color="red"/>
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
