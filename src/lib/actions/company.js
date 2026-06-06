"use server"
import { serverMutation } from "../core/serverMutation"

export const createCompany=async(data)=>{
    return serverMutation("/new/company",data)
}