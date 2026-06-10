import { serverFetch } from "../core/serverMutation"

export const getApplications=async(applicantId)=>{
    const applications=await serverFetch(`/api/applications?applicantId=${applicantId}`)
    return applications;
}