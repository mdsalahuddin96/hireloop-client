
import { headers } from "next/headers";
import { auth } from "../auth"
import { redirect } from "next/navigation";



export const getUserSession=async()=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })
    return session?.user||null;
}

export const getUserToken=async()=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })
    const token=session?.session?.token;
    return token||null;
}
await getUserToken();
export const requiredRole=async(role)=>{
    const user=await getUserSession()
    if(user.role!==role){
        return redirect("/unauthorized")
    }
}