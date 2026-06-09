import JobSearchFilter from "@/components/Main/FilterJobs";
import JobCard from "@/components/Main/JobCard";
import { getAllJobs } from "@/lib/api/companies";

const JobsPage = async () => {
  const jobs = await getAllJobs();
  return (
    <div>
      <JobSearchFilter />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto py-10">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
