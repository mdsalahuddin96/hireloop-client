"use server"
import { revalidatePath } from "next/cache"
import { serverMutation } from "../core/serverMutation"

export const createCompany=async(data)=>{
    return serverMutation("/new/company",data)
}

export const updateCompany=async(id,data)=>{
    const status={
        "status":data
    }
    const result=serverMutation(`/api/updateCompany/${id}`,status,"PATCH")
    revalidatePath("/dashboard/admin/companies")
    return result;
}