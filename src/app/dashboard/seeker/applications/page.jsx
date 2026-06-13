import {
  Table,
  Badge,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { getApplications } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import { Eye } from "@gravity-ui/icons";

const SeekerApplications = async () => {
  const user = await getUserSession();
  const applications = await getApplications(user?.id);

  if (!applications?.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border p-8 text-center">
          <h2 className="text-2xl font-bold">No Applications Yet</h2>

          <p className="mt-3 text-default-500">
            You haven&apos;t applied to any jobs yet. Start exploring opportunities
            and submit your first application.
          </p>

          <Link href="/jobs">
            <Button color="primary" className="mt-6">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Applications</h1>

        <p className="mt-2 text-default-500">
          Track all your submitted job applications.
        </p>
      </div>

      <div className="rounded-2xl border">
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Applied Jobs"
              className="min-w-[900px]"
            >
              <Table.Header>
                <Table.Column isRowHeader>Job Title</Table.Column>
                <Table.Column>Company</Table.Column>
                <Table.Column>Applied Date</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {applications.map((application) => (
                  <Table.Row key={application._id}>
                    <Table.Cell>
                      {application?.jobTitle}
                    </Table.Cell>

                    <Table.Cell>
                      {application?.companyName}
                    </Table.Cell>

                    <Table.Cell>
                      {new Date(
                        application.appliedAt
                      ).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>
                      <span
                        className={
                          `rounded-full px-1.5 py-1 ${application.status === "accepted"
                            ? "bg-green-500"
                            : application.status === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"}`
                        }
                      >
                        {application?.status||"pending"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <Link href={`/jobs/${application.jobId}`}>
                        <Button
                          size="sm"
                          variant="bordered"
                        >
                          <Eye size={18} />
                          View Job
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default SeekerApplications;