import RecruiterJobsTable from '@/components/dashboard/RecruiterJobsTable';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import { getCompanyJobs } from '@/lib/api/getCompanyJobs';


const RecruiterJobsPage =async () => {
    const company=await getLoggedInRecruiterCompany()
    const jobs=await getCompanyJobs(company?._id)
    return (
        <div>
            Recruiter Jobs
            <RecruiterJobsTable jobs={jobs}/>
        </div>
    );
};

export default RecruiterJobsPage;