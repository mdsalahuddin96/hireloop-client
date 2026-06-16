import { protectedFetch } from "../core/serverMutation"

export const getApplications=async(applicantId)=>{
    const applications=await protectedFetch(`/api/applications?applicantId=${applicantId}`)
    return applications;
}