import Link from "next/link";

const jobs = [
  {
    id: 1,
    title: "React Developer",
  },
  {
    id: 2,
    title: "Next.js Developer",
  },
  {
    id: 3,
    title: "Frontend Engineer",
  },
];

export default function SimilarJobs() {
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">
        Similar Jobs
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="rounded-2xl border p-5 transition hover:border-primary"
          >
            <h3 className="font-semibold">
              {job.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}