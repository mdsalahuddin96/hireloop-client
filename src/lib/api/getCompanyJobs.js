const baseUrl = process.env.SERVER_BASE_URL;
export const getCompanyJobs=async(companyId="",status="")=>{
    const res=await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
    return await res.json()
}