import RecruiterJobsTable from '@/components/dashboard/RecruiterJobsTable';
import { getCompanyJobs } from '@/lib/api/getCompanyJobs';


const RecruiterJobsPage =async () => {
    const companyId="company_123"
    const jobs=await getCompanyJobs(companyId)
    // console.log("Company Jobs",jobs)
    return (
        <div>
            Recruiter Jobs
            <RecruiterJobsTable jobs={jobs}/>
        </div>
    );
};

export default RecruiterJobsPage;