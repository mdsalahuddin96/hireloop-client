import { serverFetch } from "../core/serverMutation";

export const getPlanById=async(planId)=>{
    if(!planId){
        return null;
    }
    const plan=await serverFetch(`/api/plan?planId=${planId}`)
    return plan;
}