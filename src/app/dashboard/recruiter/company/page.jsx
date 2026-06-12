import CompanyProfile from '@/components/dashboard/CompanyProfile';
import { getRecruiterCompany } from '@/lib/api/companies';

import { getUserSession } from '@/lib/core/session';


const CompanyPage =async () => {
  const user=await getUserSession()
  const company=await getRecruiterCompany(user?.id)
  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company}/>
    </div>
  );
};

export default CompanyPage;