
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