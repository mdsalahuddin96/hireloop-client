
import { serverFetch } from "../core/serverMutation"
import { getUserSession } from "../core/session";

export const getRecruiterCompany=async(recruiterId)=>{
    const company=await serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)
    return company;
}

export const getLoggedInRecruiterCompany=async()=>{
    const user=await getUserSession()
    return getRecruiterCompany(user?.id)
}

export const getAllJobs=async(searchParams)=>{
    const queryString = new URLSearchParams(searchParams).toString();
    const url=queryString?`/api/jobs?${queryString}`:"/api/jobs"
    const jobs=await serverFetch(url);
    return jobs;
}

export const getJobsById=async(id)=>{
    if(!id){
        return null;
    }
    const job=await serverFetch(`/jobs/${id}`)
    return job;
}
