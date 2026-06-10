"use server"

import { serverMutation } from "../core/serverMutation"

export const createApplication=async(applicationData)=>{
    return serverMutation("/api/apply",applicationData)
}