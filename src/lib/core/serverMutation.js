const baseUrl = process.env.SERVER_BASE_URL;

export const serverFetch=async(path)=>{
    const res=fetch(`${baseUrl}${path}`)
    return (await res).json();
}
export const serverMutation=async(path,data)=>{
    const res=await fetch(`${baseUrl}${path}`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    return res.json()
}