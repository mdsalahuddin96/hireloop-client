import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.SERVER_BASE_URL;

export const authHeaders=async()=>{
    const token=await getUserToken()
    const headers=token?{
        authorization:`Bearer ${token}`
    }:{};
    return headers;
}
export const serverFetch=async(path)=>{
    const res=await fetch(`${baseUrl}${path}`)
    return await res.json();
}

export const protectedFetch=async(path)=>{
    const res=await fetch(`${baseUrl}${path}`,{
        headers:await authHeaders()
    })
    // handle 401,403,404
    if(res.status===401){
        redirect("/unauthorized")
    }
    return await res.json()
}
export const serverMutation=async(path,data,method="POST")=>{
    
    const res=await fetch(`${baseUrl}${path}`,{
        method:method,
        headers:{
            "content-type":"application/json",
            ...await authHeaders()
        },
        body:JSON.stringify(data)
    })
    return res.json()
}